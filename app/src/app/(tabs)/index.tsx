import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from 'context/auth/AuthContext'

const Homepage = () => {
  

  const { tokens, user } = useAuth();
  console.log(user, tokens);

  return (
    <View>
      <Text style={{ color: "red", marginBlock: 50}}>Homepage</Text>
    </View>
  )
}

export default Homepage