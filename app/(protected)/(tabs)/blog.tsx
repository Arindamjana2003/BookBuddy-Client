import { StyleSheet, useColorScheme, View } from 'react-native';
import React, { useEffect } from 'react';
import BlogHeader from '@/components/ui/headers/BlogHeader';
import { Colors } from '@/constants/Colors';
import { useBlogStore } from '@/store/useBlogStore';
import BlogList from '@/components/blog/BlogList';

const Blog = () => {
  const theme = Colors[useColorScheme() ?? 'light'];

  const { loading, blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BlogHeader />
      <BlogList loading={loading} blogs={blogs} onRefresh={fetchBlogs} />
    </View>
  );
};

export default Blog;

const styles = StyleSheet.create({});
