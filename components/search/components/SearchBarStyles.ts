import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  searchbar: {
    elevation: 2,
    borderRadius: 24,
    flex: 1,
    marginRight: 8,
  },
  searchbarActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputStyle: {
    fontSize: 16,
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
