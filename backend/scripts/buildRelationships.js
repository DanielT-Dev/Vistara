const mongoose = require("mongoose");

const Painting = require("../models/Painting");
const connectDB = require("../db/connect");
const logger = require("../utils/logger");

const movementTags = [
  "renaissance",
  "baroque",
  "romanticism",
  "neoclassicism",
  "symbolism",
  "realism",
  "gothic",
];

/**
 * Converts a painting's tags and description into normalized words.
 */
function getWords(painting) {
  const tags = (painting.tags || []).map((tag) => tag.toLowerCase());

  const description = (painting.description || "")
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 4);

  return [...tags, ...description];
}

/**
 * Creates a term-frequency map for a painting.
 */
function createTermFrequency(painting) {
  const words = getWords(painting);
  const frequencies = {};

  for (const word of words) {
    frequencies[word] = (frequencies[word] || 0) + 1;
  }

  return frequencies;
}

/**
 * Calculates the inverse document frequency for every word.
 *
 * IDF gives less importance to words that appear in many paintings
 * and more importance to words that are specific to a few paintings.
 */
function calculateIDF(paintings) {
  const documentFrequency = {};
  const totalDocuments = paintings.length;

  for (const painting of paintings) {
    const uniqueWords = new Set(getWords(painting));

    for (const word of uniqueWords) {
      documentFrequency[word] = (documentFrequency[word] || 0) + 1;
    }
  }

  const idf = {};

  for (const [word, frequency] of Object.entries(documentFrequency)) {
    idf[word] = Math.log(totalDocuments / frequency);
  }

  return idf;
}

/**
 * Creates a TF-IDF vector for a painting.
 */
function createTFIDFVector(painting, idf) {
  const termFrequency = createTermFrequency(painting);
  const vector = {};

  for (const [word, frequency] of Object.entries(termFrequency)) {
    vector[word] = frequency * (idf[word] || 0);
  }

  return vector;
}

/**
 * Calculates cosine similarity between two TF-IDF vectors.
 *
 * Returns a value between 0 and 1:
 * 0 = completely different
 * 1 = identical
 */
function cosineSimilarity(vectorA, vectorB) {
  const keys = new Set([
    ...Object.keys(vectorA),
    ...Object.keys(vectorB),
  ]);

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (const key of keys) {
    const a = vectorA[key] || 0;
    const b = vectorB[key] || 0;

    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

/**
 * Calculates the final similarity score between two paintings.
 *
 * Components:
 * - TF-IDF + cosine similarity for textual/tag similarity
 * - same artist
 * - shared art movements
 */
function calculateScore(a, b, vectors) {
  const textSimilarity = cosineSimilarity(
    vectors.get(a._id.toString()),
    vectors.get(b._id.toString())
  );

  // Convert cosine similarity (0-1) into a 0-10 score.
  let score = textSimilarity * 10;

  // Same artist is a strong similarity signal.
  if (a.artist === b.artist) {
    score += 5;
  }

  // Shared art movements provide an additional similarity signal.
  const aMovements = (a.tags || []).filter((tag) =>
    movementTags.includes(tag.toLowerCase())
  );

  const bMovements = (b.tags || []).filter((tag) =>
    movementTags.includes(tag.toLowerCase())
  );

  const sharedMovements = aMovements.filter((movement) =>
    bMovements.includes(movement)
  );

  score += sharedMovements.length * 2;

  return score;
}

async function buildRelationships() {
  await connectDB();

  logger.info("🔗 Building relationships...");

  const paintings = await Painting.find();

  // Calculate IDF using the entire painting collection.
  const idf = calculateIDF(paintings);

  // Pre-calculate TF-IDF vectors so we don't repeatedly calculate them.
  const vectors = new Map();

  for (const painting of paintings) {
    vectors.set(
      painting._id.toString(),
      createTFIDFVector(painting, idf)
    );
  }

  for (const painting of paintings) {
    const scores = [];

    for (const other of paintings) {
      if (painting._id.equals(other._id)) {
        continue;
      }

      const score = calculateScore(painting, other, vectors);

      if (score > 0) {
        scores.push({
          id: other._id,
          score: Number(score.toFixed(4)),
        });
      }
    }

    const topRelated = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    await Painting.findByIdAndUpdate(painting._id, {
      relatedPaintings: topRelated,
    });

    logger.info(`Updated: ${painting.title}`);
  }

  logger.info("✅ Done building relationships");

  mongoose.connection.close();
}

buildRelationships().catch((err) => {
  logger.error(err);
  mongoose.connection.close();
});