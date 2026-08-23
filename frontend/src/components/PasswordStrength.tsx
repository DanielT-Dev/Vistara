import {
    Box,
    HStack,
    Progress,
    Text,
    Fade,
} from "@chakra-ui/react";

import { evaluatePassword } from "../utils/passwordStrength";

interface Props {
    password: string;
}

export default function PasswordStrength({
    password,
}: Props) {

    if (!password) {
        return null;
    }

    const strength =
        evaluatePassword(password);

    return (
        <Box mt={3}>

            <HStack
                justify="space-between"
                mb={1}
            >
                <Text
                    fontSize="xs"
                    color="gray.500"
                >
                    Password strength
                </Text>

                <Text
                    fontSize="xs"
                    fontWeight="600"
                    color={strength.color}
                >
                    {strength.label}
                </Text>
            </HStack>


            <Progress
                value={strength.progress}
                size="xs"
                borderRadius="full"
                colorScheme={
                    strength.score <= 1
                        ? "red"
                        : strength.score <= 3
                        ? "orange"
                        : strength.score === 4
                        ? "blue"
                        : "green"
                }
            />


            <Fade in>

                {strength.isStrong ? (

                    <Text
                        mt={2}
                        fontSize="sm"
                        color="green.500"
                        fontWeight="500"
                    >
                        ✓ Strong password
                    </Text>

                ) : (

                    <Text
                        mt={2}
                        fontSize="sm"
                        color="gray.500"
                    >
                        {strength.nextRequirement}
                    </Text>

                )}

            </Fade>

        </Box>
    );
}