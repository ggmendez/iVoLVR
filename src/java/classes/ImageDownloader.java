/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

/**
 *
 * @author Gonzalo
 */
public class ImageDownloader {

    private final String address;
    private final String outFileName;

    public static String savingFolder = "uploads";
    public static String savingDirectory = "C:/Users/Gonzalo/Documents/NetBeansProjects/iVoLVR/" + ImageDownloader.savingFolder;
    private static final String operatingSystem = System.getProperty("os.name");

    static {
        if (ImageDownloader.operatingSystem.contains("Mac OS")) {
            savingDirectory = "/Users/ggm/Development/iVoLVR/" + ImageDownloader.savingFolder;
        }
    }

    public ImageDownloader(String address, String outFileName) {
        this.address = address;
        this.outFileName = outFileName;
    }    

    public void download() throws MalformedURLException, IOException {
        
        System.out.println("Trying to download the image file from: " + this.address);

        URL url = new URL(this.address);
        InputStream inputStream = new BufferedInputStream(url.openStream());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int n = 0;
        while (-1 != (n = inputStream.read(buffer))) {
            out.write(buffer, 0, n);
        }
        out.close();
        inputStream.close();
        byte[] response = out.toByteArray();
        
        String fileName = ImageDownloader.savingDirectory + "/" + this.outFileName + ".png";
        System.out.println("fileName: " + fileName);

        FileOutputStream fos = new FileOutputStream(fileName);
        fos.write(response);
        fos.close();
    }

    public static void main(String[] args) throws MalformedURLException, IOException {
        
        ImageDownloader imageDownloader = new ImageDownloader("https://upload.wikimedia.org/wikipedia/meta/6/6d/Wikipedia_wordmark_1x.png", "TheNameOfTheImage");
        imageDownloader.download();

    }

}
