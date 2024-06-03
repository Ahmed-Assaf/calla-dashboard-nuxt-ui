export const useImageUpload = () => {
  const thumbnails = ref([]);
  const fileList = ref([]);

  const imgsList = computed(() => {
    if (fileList.value) {
      return updateFileList();
    }
    return undefined; // return null if fileList is empty
  });

  // upload images
  const uploadImages = (event) => {
    for (const imgObj of event) {
      const imgName = imgObj.name;
      fileList.value.push(imgName);

      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        thumbnails.value.push(e.target.result);
      };
      fileReader.readAsDataURL(imgObj);
    }

    updateFileList();
  };

  // remove image
  const removeImage = (img) => {
    const index = thumbnails.value.indexOf(img);
    if (index !== -1) {
      thumbnails.value.splice(index, 1);
      fileList.value.splice(index, 1);
    }

    updateFileList();
  };

  const updateFileList = () => {
    const dataTransfer = new DataTransfer();
    for (const f of fileList.value) {
      const myFile = new File([f], f, {
        type: "image",
        lastModified: new Date(),
      });

      dataTransfer.items.add(myFile);
    }

    return dataTransfer.files;
  };

  return {
    thumbnails,
    imgsList,
    uploadImages,
    removeImage,
  };
};
