import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    position: 'relative', 
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingBottom: 5,
  },
  categoryItem: {
    marginRight: 20,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  categoryUnderline: {
    height: 3,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 3,
  },
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  subcategoryBar: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  subcategoryItem: {
    marginRight: 10,
    marginBottom: 5,
  },
  subcategoryText: {
    fontSize: 10,
  },
  scrollButton: {
    padding: 5,
  },
});

export default styles;
