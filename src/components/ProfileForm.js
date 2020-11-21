import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';

export default class ProfileForm extends React.Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      year: '',
      major: '',
      covidStatus: '',
      gender: '',
      age: '',
      interests: [],
      classes: [],
    },
  };

  getMajorOptions = async () => {
    return ['Computer Science'];
  };
  getInterests = () => {
    return [
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

  onSelectedInterestsChange = (selectedItems) => {
    this.formData = this.state.formData;
    this.formData.interests = selectedItems;
    this.setState({formData: this.formData});
  };

  render() {
    let interests = this.getInterests().map((item) => {
      return {name: item, id: item};
    });
    return (
      <View style={{flex: 1}}>
        <Text style={styles.fieldTitle}>Year</Text>
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
        <Text style={styles.fieldTitle}>Interests</Text>
        <MultiSelect
          hideTags
          items={interests}
          uniqueKey="id"
          ref={(component) => {
            this.multiSelect = component;
          }}
          onSelectedItemsChange={this.onSelectedInterestsChange}
          selectedItems={this.state.interests}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldTitle: {
    fontSize: 30,
    borderBottomWidth: 1,
  },
});
