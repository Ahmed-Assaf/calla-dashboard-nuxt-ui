export const useImageUploadSingle = ({ defaultImg }) => {
  const thumbnail = ref(defaultImg);
  const fileList = ref();

  const imgList = computed(() => {
    if (fileList.value) {
      return updateFileList();
    }
    return undefined;
  });

  // upload image
  const uploadImage = function (event) {
    const imgName = event.name;
    fileList.value = imgName;

    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(event);
      thumbnail.value = e.target.result;
    };
    reader.readAsDataURL(event[0]);
    updateFileList();
  };

  // remove image
  const removeImage = (img) => {
    const index = thumbnail.value.indexOf(img);
    if (index !== -1) {
      thumbnail.value = defaultImg;
      fileList.value = undefined;
    }

    updateFileList();
  };

  const updateFileList = () => {
    const dataTransfer = new DataTransfer();
    const f = fileList.value;

    const myFile = new File([f], f, {
      type: "image",
      lastModified: new Date(),
    });

    dataTransfer.items.add(myFile);

    return dataTransfer.files;
  };

  return {
    thumbnail,
    imgList,
    uploadImage,
    removeImage,
  };
};
