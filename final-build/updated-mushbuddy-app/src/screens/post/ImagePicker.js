import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform,  ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
export default function ImageUpload({setImages,images}) {
  const [image, setImage] = useState(images);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      const { uri, base64 } = result
      uploadImage(uri, base64)
      setImage(result.uri);
    }
  };

  const uploadImage = async (uri, base64) => {
    const uriArr = uri.split('.');
    const fileType = uriArr[uriArr.length - 1]
    const file = `data:${fileType};base64,${base64}`
  
    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "preset1")
    formData.append("cloud_name", "doxhkmt1d")

    const res = await fetch("https://api.cloudinary.com/v1_1/doxhkmt1d/upload", {
        method: "POST",
        body: formData
    })
    
    const data = await res.json()

    setUrl(data.url)
    setImages(data.url)
    console.log('fiisheduploading')
    console.log(data.url)
  }

  const renderUploadButton = () => {
      if (url == ''){
          if (uploading){
              return (
                  <ActivityIndicator size='large'></ActivityIndicator>
              )
          }
          else{
            return (
                <Button title="Upload" onPress={uploadImage} />
            )
          }
      }
      else{
        return (
            <Button title="Uploaded"/>
          )
      }
  }

  const loadingIndicator = () => {
    if (shouldFetch){
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.GREY_1} />
            </View>
        );
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}