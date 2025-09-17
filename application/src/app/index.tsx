import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingSlides } from "../constants/onboarding-slides";
import Btn from "../components/ui/btn/Btn";
import Heading from "../components/ui/texts/Heading";

export default function Index() {
  return (
    <SafeAreaView
      className="bg-body p-5 flex-1 justify-end items-center"
      edges={["bottom", "top"]}
    >

      <Heading className="w-[80%]" size="3xl" alignment="center">مرحبا بكم في تطبيق طريقك</Heading>
      <Btn link="/contact">
          Contact
      </Btn>

      {/* <FlatList
        data={onboardingSlides}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      /> */}
    </SafeAreaView>
  );
}
