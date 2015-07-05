/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.io.File;
import org.opencv.core.Core;

/**
 *
 * @author ggm
 */
public class OpenCVLoader {
    
    
    
    public static String imagesFolder = "uploads";
    public static String webPagesFolder = "urls";

    private static String operatingSystem = System.getProperty("os.name");
    public static String classLoaderPath = new File(OpenCVLoader.class.getClassLoader().getResource("").getPath()).getPath();
    public static String fileSeparator = System.getProperty("file.separator");

    static {
        if (operatingSystem.contains("Mac OS")) {
            System.load("/Users/ggm/Development/iVoLVR/lib/libopencv_java249.dylib");
        } else {
            System.load("C:/Users/Gonzalo/Documents/NetBeansProjects/iVoLVR/lib/opencv_java249_64.dll");
        }
    }

    public static String getProjectFolderPath(String contextPath) {
        String[] split = OpenCVLoader.classLoaderPath.split(contextPath.substring(1));
        String projectFolderPath = split[0] + contextPath.substring(1);
        return projectFolderPath;
    }
    
    

    public OpenCVLoader() {

    }

}
