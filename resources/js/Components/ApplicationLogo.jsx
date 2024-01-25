export default function ApplicationLogo(props) {
  const baseUrl = window.location.origin;

    return <img src={`${baseUrl}/assets/logo.png`} alt="Logo" width="120" />;
}
