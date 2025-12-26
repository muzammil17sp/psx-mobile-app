import { View } from 'react-native'
import React from 'react'
import PortfolioCard from './components/PortfolioCard'
import PortfolioStockList from './components/PortfolioStockList'

const PortfolioScreen = () => {
  return (
    <View style={{ backgroundColor: '#121212', flex: 1 }}>
      <PortfolioCard />
      <PortfolioStockList />
    </View>
  )
}

export default PortfolioScreen