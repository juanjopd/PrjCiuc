import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    fontSize: 12,
  },
});

export const StudentsPdf = ({ students }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Reporte de Estudiante</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Código</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Nota</Text>
          </View>
        </View>
        {students.map((student) => (
          <View key={student.studentCode} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.studentCode}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{student.grade || "Sin nota"}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

