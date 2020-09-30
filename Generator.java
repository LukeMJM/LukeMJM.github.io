package generator;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.concurrent.ThreadLocalRandom;

// This class generates a CSV file of 50 lines, each containing 3 sets of urls with randomised GET parameters
public class Generator {

	public static String line() {
		
		// string to hold output
		String outputLine = "";
		
		for (int i = 1; i <= 3; i++) {
			
			// min and max values for parameters
			int hMin = 10;
			int hMax = 120;
			int wMin = 3;
			int wMax = 60;
			int sMin = 2;
			int sMax = 10;
			double gMin = 0.2;
			double gMax = 0.75;
			int iYMin = -18;
			int iYMax = -9;
			int lMin = 1;
			int lMax = 5;
			double oSIMin = 0.1;
			double oSIMax = 1;
			boolean jumpChambering;
			
			
			// create random nums here		
			int randHeight = ThreadLocalRandom.current().nextInt(hMin, hMax + 1);
			int randWidth = ThreadLocalRandom.current().nextInt(wMin, wMax + 1);
			int randSpeed = ThreadLocalRandom.current().nextInt(sMin, sMax + 1);
			double randGravity = ThreadLocalRandom.current().nextDouble(gMin, gMax);
			int randImpulse = ThreadLocalRandom.current().nextInt(iYMin, iYMax + 1);
			int randLives = ThreadLocalRandom.current().nextInt(lMin, lMax + 1);
			double randObstacleSpeedIncrement = ThreadLocalRandom.current().nextDouble(oSIMin, oSIMax);
			double jumpChamberingStatus = ThreadLocalRandom.current().nextDouble(0, 1);
			
			if (jumpChamberingStatus >= 0.5) {
				jumpChambering = true;
			} else {
				jumpChambering = false;
			}
			
			// Decimal formatting to 2 decimal places
			DecimalFormat df = new DecimalFormat("###.##");
			
			String URL = ("https://lukemjm.github.io/jumpy?h=" + randHeight + 
					"&w=" + randWidth + 
					"&s=" + randSpeed + 
					"&g=" + df.format(randGravity) + 
					"&iY=" + randImpulse + 
					"&l=" + randLives + 
					"&cJE=" + jumpChambering + 
					"&oSI=" + df.format(randObstacleSpeedIncrement) +
					"&id=" + i + 
					"&t=60");
			
			if (i != 3) {
				outputLine = outputLine + ("\"" + URL + "\",");
			} else {
				outputLine = outputLine + ("\"" + URL + "\"");

			}
		}
		
		System.out.println("creating new line");
		
		return outputLine;
		
	}
	
	public static void main(String[] args) {
			
		
		File file = new File("URLs.txt");
		
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				System.err.println("Unable to create file");
			}
		}
		
		try {
			FileWriter fw = new FileWriter(file, false); // the ,true indicates that you want to append to the .txt file rather than overwrite it!
			BufferedWriter bw = new BufferedWriter(fw);
			
			bw.write("url1,url2,url3\n");
			
			for (int i = 0; i < 50; i++) {
				bw.write(line() + "\n");
			}
			
			bw.close();
			fw.close();
			
		} catch (IOException e) {
			System.err.println("Error writing to file");
		}


	} // end of main
}
