import loading from '../../assets/loading.gif'
function Spinner() {
  const styles = {
    height: '3rem',
    width: '3rem',
    margin: 'auto',
    display: 'block'
  }
  return  <img src={loading} alt="Loading..." style={styles} />
}
export default Spinner