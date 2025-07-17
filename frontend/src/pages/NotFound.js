export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1>404</h1>
      <p>Page not found!</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem'
  }
};
