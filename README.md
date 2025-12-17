# 🛡️ MetaLyzer – Professional Metadata Forensics Tool

![Privacy Safe](https://img.shields.io/badge/Privacy-100%25%20Local-brightgreen)
![Client Side](https://img.shields.io/badge/Processing-Client--Side-blue)
![No Uploads](https://img.shields.io/badge/Data-Never%20Uploaded-success)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Platform](https://img.shields.io/badge/Platform-Web%20App-lightgrey)

MetaLyzer is a powerful **client-side web application** designed to reveal the hidden **digital DNA** inside your files. It extracts deep metadata (EXIF, XMP, IPTC, GPS) from images, videos, and documents **entirely within your browser** — no data is ever uploaded to a server.

🔗 **Live Demo:** [https://giriaryan694-a11y.github.io/MetaLyzer/](https://giriaryan694-a11y.github.io/MetaLyzer/)

---

## ✨ Key Features

### 🔒 100% Client-Side

All processing happens locally in your browser. Your files **never leave your device**, ensuring maximum privacy.

### 🕵️ Deep Scan Engine

Powered by a custom implementation of **ExifReader**, capable of extracting metadata tags that standard viewers often miss.

### 📍 Location Intelligence

* Automatically detects embedded GPS coordinates
* Performs **Reverse Geocoding** to convert raw coordinates into readable addresses (Country, City, Street)
* Includes **“View on Google Maps”** integration

### 📱 Fully Responsive

Optimized for both **desktop forensic analysis** and **mobile on-the-go investigations**.

### 🛡️ Fortress Mode

Includes a **Manual Loader** backup system to bypass network restrictions (ad‑blockers, strict firewalls) that may block external library loading.

### 📊 Multi-Format Export

Download complete forensic reports in multiple formats:

* **PDF** – Professionally formatted report with credits
* **JSON** – Raw structured data for developers
* **CSV** – Spreadsheet-compatible format
* **TXT** – Simple text-based log

### 🖼️ Embedded Previews

Extracts hidden **thumbnail previews** from RAW and JPEG files when available.

---

## 🚀 How to Use

1. **Open the Tool**
   Simply open `index.html` in any modern web browser.

2. **Upload a File**
   Drag and drop an image (JPG, PNG, TIFF, HEIC), video, or PDF onto the drop zone.

3. **Analyze**
   MetaLyzer instantly parses the file structure and displays the metadata dashboard.

4. **View Location**
   If GPS data is detected, a green map card will appear with the resolved address.

5. **Export**
   Use the sidebar buttons to download your forensic report in the desired format.

---

## ⚠️ Privacy & Safety

While MetaLyzer is excellent for **revealing hidden metadata**, sometimes you need to remove sensitive information before sharing files publicly.

For metadata scrubbing (GPS location, camera serial numbers, timestamps), we recommend:

### 🧼 MetaWipe – Metadata Cleaner

Use **MetaWipe** to permanently strip metadata from your files before uploading them to social media or public platforms.

🔗 **MetaWipe Live Tool:** [https://giriaryan694-a11y.github.io/meta-wipe/](https://giriaryan694-a11y.github.io/meta-wipe/)

---

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3 (CSS Variables for theming), Vanilla JavaScript (ES6+)
* **Metadata Engine:** ExifReader v4.33.1
* **PDF Generation:** jsPDF + jspdf-autotable
* **Mapping & Geocoding:** OpenStreetMap (Nominatim API) — privacy‑friendly reverse geocoding

---

## 👨‍💻 Credits

**Created & Maintained by:** Aryan Giri
**License:** MIT

> **Disclaimer:** This tool is intended for educational and forensic analysis purposes only. Always respect privacy laws and obtain proper authorization before analyzing files that do not belong to you.
