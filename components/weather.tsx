import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Spacer,
  Image,
  Switch,
  Button,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface WeatherContainerProps {
  data: {
    name?: string;
    weather?: Array<Weather>;
    main?: Main;
    wind?: Wind;
    sys?: System;
  };
  close: (params: any) => any;
}
interface System {
  country: string;
}
interface Wind {
  deg: number;
  speed: number;
}
interface Main {
  feels_like: number;
  humidity: number;
}
interface Weather {
  main: string;
  icon: string;
  description: string;
}

export default function WeatherContainer({
  data,
  close,
}: WeatherContainerProps) {
  const [unit, setUnit] = useState(true);

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const icon = `https://openweathermap.org/img/wn/${
    data.weather![0].icon
  }@2x.png`;
  const kelvin = data.main!.feels_like;
  const celsius = Math.round(kelvin - 273.15);
  const fahrenheit = Math.floor(celsius * (9 / 5) + 32);

  return (
    <Flex
      direction="column"
      alignItems="center"
      maxWidth="max-content"
      background={formBackground}
      p={12}
      rounded={6}
    >
      <Flex direction="row" w="100%">
        <Button justifyContent="flex-start" onClick={close}>
          Return
        </Button>
        <Spacer />
        <Switch
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUnit(e.currentTarget.checked)
          }
          isChecked={unit}
          justifyContent="flex-end"
        />
      </Flex>
      <Flex direction="row" alignItems="center" gap="10" p={12} rounded={6}>
        <Stack justify="flex-start" spacing={1} mr={3}>
          <Heading as="h1" size="xl" mb={3}>
            {data.weather![0].description.toUpperCase()}
          </Heading>
          <Heading as="h2" size="md" mb={6}>
            {data.name}, {data.sys!.country}
            <Image src={icon} alt="weather symbol" />
          </Heading>
        </Stack>
        <Spacer />
        <Stack spacing={4} justify="flex-end">
          <Text fontSize="1xl">
            Feels like {unit ? `${fahrenheit} \u00B0F` : `${celsius}\u00B0C`}
          </Text>
          <Text fontSize="1xl">Humidity {data.main!.humidity}%</Text>
          <Text fontSize="1xl">
            Wind Speed{" "}
            {unit
              ? `${Math.round(data.wind!.speed)} mph`
              : `${Math.round(data.wind!.speed * 1.609344)} kph `}
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
}
