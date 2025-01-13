import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const TestScreen = () => {
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://staging.apnaecart.com/api/product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
        }

        const result = await response.json();
        console.log('API Response:', result); 
        setFetchData(result.data?.product || []); 
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', error.message || 'Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const trendingData = fetchData.filter(item => item.id_product_tags === "1");
  const salesData = fetchData.filter(item => item.flash_sale_status === "1");

  
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.image_url }}
        resizeMode="contain"
        style={styles.productImage}
      />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{`AED ${item.price}`}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Products</Text>
      </View>
      <FlatList
        horizontal
        data={trendingData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sales</Text>
      </View>
      <FlatList
        horizontal
        data={salesData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productContainer: {
    margin: 10,
    alignItems: 'center',
  },
  productImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 5,
  },
});
