export default function Spanify(text) {
  // Keep words as real text: fewer layout nodes and natural screen-reader output.
  return text.split('').map((char, index) => <span key={index}>{char}</span>);
}
