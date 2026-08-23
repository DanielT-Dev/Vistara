import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";
import { validateLogin } from "../utils/loginValidation";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { login } from "../store/authSlice";

export default function Login() {
  const navigate = useNavigate();

  const toast = useToast();

  const [loggingIn, setLoggingIn] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    errors,
    setErrors,
    reset,
  } = useAuthForm();

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const result = validateLogin(email, password);

    setErrors(result);

    if (Object.keys(result).length > 0) {
      return;
    }


    try {
      setLoading(true);


      const data = await loginUser(
        email,
        password
      );


      dispatch(
        login({
          user: data.user,
          token: data.token,
        })
      );
      
      localStorage.setItem("token", data.token);

      toast({
        title: "Login successful",
        description: `Welcome back ${data.user.username}!`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });


      setLoggingIn(true);


      setTimeout(() => {
        navigate("/gallery");
      }, 1000);

    } catch (err: any) {

      toast({
        title: "Login failed",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });


    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      bgGradient="linear(to-br, gray.50, purple.50, blue.50)"
    >

      {/* Background glow effects */}
      <Box
        position="absolute"
        width="450px"
        height="450px"
        bg="purple.200"
        opacity={0.35}
        filter="blur(120px)"
        top="-150px"
        left="-100px"
      />

      <Box
        position="absolute"
        width="400px"
        height="400px"
        bg="blue.200"
        opacity={0.35}
        filter="blur(120px)"
        bottom="-150px"
        right="-100px"
      />



      {/* Login card */}
      <Box
        width={{
          base: "90%",
          sm: "420px",
        }}
        p={10}
        bg="rgba(255,255,255,0.75)"
        backdropFilter="blur(20px)"
        borderRadius="3xl"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="0 20px 60px rgba(0,0,0,0.12)"
      >

        <VStack
          spacing={5}
          align="stretch"
        >

          {
            loggingIn ? (

              <VStack
                spacing={5}
                py={8}
              >

                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.8s"
                  color="purple.500"
                />

                <Heading
                  textAlign="center"
                  fontSize="2xl"
                  color="gray.800"
                >
                  Welcome back!
                </Heading>


                <Text
                  textAlign="center"
                  color="gray.500"
                >
                  Taking you to the gallery...
                </Text>

              </VStack>

            ) : (

              <>
                <Heading
                  textAlign="center"
                  fontSize="3xl"
                  color="gray.800"
                  fontWeight="700"
                >
                  Welcome Back
                </Heading>


                <Text
                  textAlign="center"
                  color="gray.500"
                  fontSize="sm"
                >
                  Continue your digital museum journey
                </Text>



                {/* Email */}
                <Box>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="white"
                    borderColor="gray.200"
                    borderRadius="xl"
                    height="48px"
                    _hover={{
                      borderColor: "purple.300",
                    }}
                    _focus={{
                      borderColor: "purple.400",
                      boxShadow:
                        "0 0 0 2px rgba(159,122,234,0.3)",
                    }}
                  />

                  {errors.email && (
                    <Text
                      mt={1}
                      fontSize="sm"
                      color="red.500"
                    >
                      {errors.email}
                    </Text>
                  )}
                </Box>



                {/* Password */}
                <Box>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="white"
                    borderColor="gray.200"
                    borderRadius="xl"
                    height="48px"
                    _hover={{
                      borderColor: "purple.300",
                    }}
                    _focus={{
                      borderColor: "purple.400",
                      boxShadow:
                        "0 0 0 2px rgba(159,122,234,0.3)",
                    }}
                  />

                  {errors.password && (
                    <Text
                      mt={1}
                      fontSize="sm"
                      color="red.500"
                    >
                      {errors.password}
                    </Text>
                  )}
                </Box>



                <Button
                  mt={3}
                  height="50px"
                  borderRadius="xl"
                  color="white"
                  bgGradient="linear(to-r, purple.500, blue.500)"
                  onClick={handleLogin}
                  isLoading={loading}
                  fontSize="md"
                  boxShadow="0 10px 25px rgba(128,90,213,0.25)"
                  transition="all 0.25s"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 15px 35px rgba(128,90,213,0.35)",
                  }}
                >
                  Login
                </Button>



                <Text
                  textAlign="center"
                  fontSize="sm"
                  color="gray.500"
                >
                  No account?{" "}

                  <Link
                    to="/signup"
                    style={{
                      color: "#805AD5",
                      fontWeight: "600",
                    }}
                  >
                    Sign up
                  </Link>

                </Text>
              </>

            )

          }

        </VStack>

      </Box>

    </Box>
  );
}