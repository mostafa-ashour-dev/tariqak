import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ExternalPathString,
  Link,
  RelativePathString,
  Route,
} from "expo-router";

type Props = {
  children: React.ReactNode | string;
  className?: string;
  onPress?: () => void;
  link?: ExternalPathString | RelativePathString | Route | undefined;
};

function BtnBody({ children, className }: Props) {
  return (
    <View
      className={`bg-primary px-5 py-3 w-full rounded-full items-center justify-center ${className}`}
    >
      <Text className="text-white font-cairo-bold">{children}</Text>
    </View>
  );
}

export default function Btn({ children, className, onPress, link }: Props) {
  if (link) {
    return (
      <Link href={link} asChild>
        <TouchableOpacity className="w-full">
          <BtnBody className={className} onPress={onPress}>
            {children}
          </BtnBody>
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <BtnBody className={className} onPress={onPress}>
        {children}
      </BtnBody>
    </TouchableOpacity>
  );
}
