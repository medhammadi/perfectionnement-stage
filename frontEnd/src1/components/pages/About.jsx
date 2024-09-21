import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    marginBottom: 3,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export const About = () => {
  const [formData, setFormData] = useState({
    yourname: '',
    youremail: '',
    contact: '',
    compétences: '',
    expérience: '',
    loisirs: '',
    langage: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Name: {formData.yourname}</Text>
            <Text>Email: {formData.youremail}</Text>
            <Text>Contact: {formData.contact}</Text>
            <Text>Compétences: {formData.compétences}</Text>
            <Text>Expérience: {formData.expérience}</Text>
            <Text>Loisirs: {formData.loisirs}</Text>
            <Text>Langage: {formData.langage}</Text>
            {formData.image && <Image src={formData.image} style={styles.image} />}
          </View>
        </Page>
      </Document>
    );

    const blob = new Blob([MyDocument], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div>
      <h2>About</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your Name:</label>
          <input type="text" name="yourname" value={formData.yourname} onChange={handleInputChange} />
        </div>
        <div>
          <label>Your Email:</label>
          <input type="email" name="youremail" value={formData.youremail} onChange={handleInputChange} />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
        </div>
        <div>
          <label>Compétences:</label>
          <input type="text" name="compétences" value={formData.compétences} onChange={handleInputChange} />
        </div>
        <div>
          <label>Expérience:</label>
          <input type="text" name="expérience" value={formData.expérience} onChange={handleInputChange} />
        </div>
        <div>
          <label>Loisirs:</label>
          <input type="text" name="loisirs" value={formData.loisirs} onChange={handleInputChange} />
        </div>
        <div>
          <label>Langage:</label>
          <input type="text" name="langage" value={formData.langage} onChange={handleInputChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">View PDF</button>
      </form>
      <PDFViewer style={{ width: '100%', height: '500px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>CV</Text>
              {formData.image && <Image src={formData.image} style={styles.image} />}
              <View style={styles.content}>
                <Text style={styles.heading}>Personal Information</Text>
                <Text>Name: {formData.yourname}</Text>
                <Text>Email: {formData.youremail}</Text>
                <Text>Contact: {formData.contact}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.heading}>Skills & Experience</Text>
                <Text>Compétences: {formData.compétences}</Text>
                <Text>Expérience: {formData.expérience}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.heading}>Other Details</Text>
                <Text>Loisirs: {formData.loisirs}</Text>
                <Text>Langage: {formData.langage}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
