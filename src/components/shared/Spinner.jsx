import Loading from '../../assets/loading.gif'
function Spinner() {
  const styles = {
    height: '3rem',
    width: '3rem'
  }
  return  <img src={Loading} alt="Loading..." style={styles} />
}
export default Spinner