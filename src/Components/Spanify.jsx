export default function Spanify(text) {
  return text.split('').map((char, index) => <span key={index}>{char}</span>);
}
