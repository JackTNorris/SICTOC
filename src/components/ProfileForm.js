import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import firebase from '../config/firebase';
import {connect} from 'react-redux';
const db = firebase.database();
class ProfileForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    year: '',
    major: '',
    covidStatus: '',
    gender: '',
    age: '',
    classes: [],
    interests: [],
    interest1: '',
    interest2: '',
    interest3: '',
    enrolledCourses: 0,
  };

  async componentDidMount() {
    await this.populateForm();
  }

  populateForm = async () => {
    try {
      await db
        .ref(`/users/${this.props.studentID}/info`)
        .once('value')
        .then((snapshot) => {
          let data = snapshot.val();
          console.log(data);
          this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            major: data.major,
            gender: data.gender,
            year: data.year,
            covidStatus: data.covidStatus,
            classes: data.classes,
            enrolledCourses: data.classes.length,
            interests: data.interests,
          });
        });
    } catch {}
  };

  submitForm = async () => {
    try {
      const data = this.state;
      console.log(data);
      await db.ref(`/users/${this.props.studentID}/info`).update({
        firstName: data.firstName,
        lastName: data.lastName,
        major: data.major,
        gender: data.gender,
        year: data.year,
        covidStatus: data.covidStatus,
        classes: data.classes,
        interests: data.interests,
      });
      Alert.alert('Submitted!');
    } catch (error) {
      Alert.alert('Error Submitting');
    }
  };

  getMajors = () => {
    return [
      'None/Other',
      'Computer Science',
      'Mechanical Engineering',
      'Business',
      'Communications',
      'Aerospace Engineering',
    ];
  };
  getInterests = () => {
    return [
      'None/Other',
      'Sports',
      'Music',
      'Videogames',
      'Fine Arts',
      'Books',
      'Science',
      'Traveling',
      'Volunteering',
    ];
  };

  getCourses = () => {
    return [
      'None/Other',
      'PHYS 2074',
      'CSCE 2004',
      'CSCE 2014',
      'CHEM 1103',
      'GNEG 1111',
      'MATH 3083',
    ];
  };

  generateCoursePickers = () => {
    let retArray = [];
    for (let i = 0; i < this.state.enrolledCourses; i++) {
      retArray.push(
        <View style={styles.formField}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text>Course {i + 1}</Text>
            <View
              style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
              <Picker
                selectedValue={this.state.classes[i]}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => {
                  let classes = this.state.classes;
                  classes[i] = itemValue;
                  this.setState({classes: classes});
                }}>
                {this.getCourses().map((item) => {
                  return <Picker.Item label={item} value={item} />;
                })}
              </Picker>
            </View>
          </View>
        </View>,
      );
    }
    return retArray;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.fieldTitle}>Name</Text>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Text>{'\n'}</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={this.state.firstName}
            onChangeText={(text) => this.setState({firstName: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={this.state.lastName}
            onChangeText={(text) => this.setState({lastName: text})}
          />
        </View>
        <Text style={styles.fieldTitle}>Gender</Text>
        <View style={styles.formField}>
          <View
            style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
            <Picker
              selectedValue={this.state.gender}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({gender: itemValue});
              }}>
              <Picker.Item label="M" value="M" />
              <Picker.Item label="F" value="F" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>
        <Text style={styles.fieldTitle}>Year</Text>
        <View style={styles.formField}>
          <View
            style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
            <Picker
              selectedValue={this.state.year}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({year: itemValue});
              }}>
              <Picker.Item label="Freshman" value="Freshman" />
              <Picker.Item label="Sophmore" value="Sophmore" />
              <Picker.Item label="Junior" value="Junior" />
              <Picker.Item label="Senior" value="Senior" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>
        <Text style={styles.fieldTitle}>Major</Text>
        <View style={styles.formField}>
          <View
            style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
            <Picker
              selectedValue={this.state.major}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({major: itemValue});
              }}>
              {this.getMajors().map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.fieldTitle}>Interests</Text>
        <View style={styles.formField}>
          <View
            style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
            <Picker
              selectedValue={this.state.interests[0]}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => {
                let interests = this.state.interests;
                interests[0] = itemValue;
                this.setState({interests: interests});
              }}>
              {this.getInterests().map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.formField}>
          <View
            style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
            <Picker
              selectedValue={this.state.interests[1]}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => {
                let interests = this.state.interests;
                interests[1] = itemValue;
                this.setState({interests: interests});
              }}>
              {this.getInterests().map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.formField}>
          <View
            style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
            <Picker
              selectedValue={this.state.interests[2]}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => {
                let interests = this.state.interests;
                interests[2] = itemValue;
                this.setState({interests: interests});
              }}>
              {this.getInterests().map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
        <Text style={styles.fieldTitle}>Courses</Text>
        <View style={styles.formField}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text>Number of courses enrolled in: </Text>
            <View
              style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
              <Picker
                selectedValue={this.state.enrolledCourses}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({enrolledCourses: itemValue});
                }}>
                <Picker.Item label="0" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
              </Picker>
            </View>
            {this.generateCoursePickers()}
          </View>
        </View>
        <Text style={styles.fieldTitle}>Covid Status</Text>
        <View style={styles.formField}>
          <View
            style={{borderWidth: 5, borderColor: 'green', borderRadius: 20}}>
            <Picker
              selectedValue={this.state.covidStatus}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({covidStatus: itemValue});
              }}>
              <Picker.Item label="Never had it" value="Never had it" />
              <Picker.Item label="Had it" value="Had it" />
              <Picker.Item label="Vaccinated" value="Vaccinated" />
            </Picker>
          </View>
        </View>
        <Button
          title="Submit Changes"
          onPress={this.submitForm}
          color="green"
        />
        <Text>{'\n'}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {studentID} = state.login;
  return {studentID};
};

export default connect(mapStateToProps, {})(ProfileForm);

const styles = StyleSheet.create({
  fieldTitle: {
    fontSize: 30,
    borderBottomWidth: 1,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 5,
    textAlign: 'center',
    marginBottom: 10,
    borderColor: 'green',
    borderRadius: 20,
  },
  formField: {padding: 50, justifyContent: 'center', flexDirection: 'row'},
});
