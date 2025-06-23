import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = "Invalid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      console.log("Login values:", { email, password });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-5">
      <Text className="text-2xl font-bold mb-10 text-neutral-900">
        Hotel OMS Login
      </Text>

      <View className="w-full mb-6">
        <TextInput
          className="w-full h-14 border border-gray-300 rounded-xl px-4 text-lg bg-white mb-2"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && (
          <Text className="text-red-600 mb-2 ml-2 text-sm">{errors.email}</Text>
        )}

        <TextInput
          className="w-full h-14 border border-gray-300 rounded-xl px-4 text-lg bg-white text-black mb-2"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text className="text-red-600 mb-2 ml-2 text-sm">
            {errors.password}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className="w-full h-14 bg-yellow-400 rounded-xl justify-center items-center mt-2"
        onPress={onSubmit}
      >
        <Text className="text-neutral-900 text-lg font-bold">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
