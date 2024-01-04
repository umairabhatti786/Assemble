import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Linking } from "react-native";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";

const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState(false);



  useEffect(() => {
    // checkCamPermission();
    requestcameraPermission();
  }, []);

  // const requestcameraPermission = async () => {
  //   try {
  //     const permissionStatus = await check(
  //       Platform.OS === "android"
  //         ? PERMISSIONS.ANDROID.CAMERA
  //         : PERMISSIONS.IOS.CAMERA
  //     );
  //     console.log("permissionStatus", permissionStatus);
  //     let result;
  //     if (permissionStatus === RESULTS.DENIED) {
  //       if (Platform.OS === "android") {
  //         result = await request(PERMISSIONS.ANDROID.CAMERA);
  //       } else {
  //         result = await request(PERMISSIONS.IOS.CAMERA);
  //       }
  //       console.log(result, "resultData");
  //       // if (result === RESULTS.GRANTED) {
  //       //   console.log("Camera permission granted");
  //       // } else {
  //       //   console.log("Camera permission denied");
  //       // }
  //     } else if (permissionStatus === RESULTS.GRANTED) {
  //       setHasPermission(true);
       
  //       console.log("Camera permission already granted");
  //     }
     
  //   } catch (error) {
  //     console.log("Error requesting camera permission:", error);
  //   }
  // };

  const requestcameraPermission = async () => {
    try {
      let permissionResult;
      if (Platform.OS === "ios") {
        permissionResult = await request(PERMISSIONS.IOS.CAMERA);
        setHasPermission(permissionResult=="granted")
      } else {
        permissionResult = await request(PERMISSIONS.ANDROID.CAMERA);
        if(permissionResult=="granted")
        {
       setHasPermission(true);
        }
        else {
          setHasPermission(false)
        }
        console.log("PermissionDaat",permissionResult)
      }
    } catch (error) {
      console.error("Error requesting gallery permission:", error);
    }
  };
  const checkCamPermission = () => {
    if (Platform.OS === "android") {
      request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
        console.log("resultPermission", result);
        if (result == "blocked") {
          setHasPermission(false);

          Linking.openSettings();
        } else if (result == "granted") {
          setHasPermission(true);
        } else {
          setHasPermission(false);

        }
      });
    } else if (Platform.OS === "ios") {
      request(PERMISSIONS.IOS.CAMERA).then((result) => {
        console.log("cdkcndkcdnckd", result);

        if (result === "blocked") {
          setHasPermission(false);

          openSettings();
        } else if (result == "granted") {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      });
    }
  };

  const checkGalleryPermission = async () => {
    console.log("permissipn")
    try {
      let permissionStatus;
      if (Platform.OS === "ios") {
        permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      } else {
        let READ_MEDIA_IMAGES = await request(
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        if (READ_MEDIA_IMAGES === "unavailable") {
          console.log("permissionStatusjjjj unavailable");
          
          permissionStatus = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          );
        } else {
          permissionStatus = READ_MEDIA_IMAGES;
        }
      }
      return permissionStatus

    } catch (error) {
      console.error("Error checking gallery permission:", error);
    }
  };

  return {
    hasPermission,
    requestcameraPermission,
    checkCamPermission,
    checkGalleryPermission,
  };
};

export { useCameraPermissions };
