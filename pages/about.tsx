import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import NextLink from "next/link";
import Header from "../components/header";
interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Header />
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        background={formBackground}
        maxWidth="800px"
        gap={2}
        p={12}
        rounded={6}
      >
        <Flex direction="row" w="100%">
          <Heading as="h1" size="3xl" mb={10} justifyContent="flex-start">
            Weather App
          </Heading>
          <Spacer />
          <Image
            justifyContent="flex-end"
            src="https://avatars.githubusercontent.com/u/74263198?v=4"
            alt="side profile"
            boxSize="150px"
            borderRadius="full"
          />
        </Flex>
        <Heading as="h2" size="md" mb={10}>
          by Joshua Semana{" "}
          <Link href="https://github.com/TidalSana" isExternal>
            (@TidalSana)
          </Link>
        </Heading>
        <Text>
          Hey! This is a project using NextJS. During the interview it was
          mentioned that my project on my GitHub was pretty much the final
          product, so I pretty much took it upon myself to re-do it and improve
          it. I was tasked with returning an endpoint that takes a lat/long
          coordinates which displays the results of the...weather!
        </Text>
        <Spacer />
        <Text>
          I also included a City input so users can enter that if they do not
          want to use coordinates. If users decide to use coordinates, I also
          made a Zip and Country Code input to find the coordinates, the country
          codes are in ISO 3166.
        </Text>
        <NextLink href="/">
          <Button colorScheme="gray" variant="outline">
            Return
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default About;
