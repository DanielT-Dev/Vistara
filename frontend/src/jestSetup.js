const { TextEncoder, TextDecoder } = require("node:util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.IntersectionObserver = class IntersectionObserver {
    constructor() {}

    observe() {}

    unobserve() {}

    disconnect() {}

    takeRecords() {
        return [];
    }
};