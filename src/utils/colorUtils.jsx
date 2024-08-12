export function generatePastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  }
  export function generatePastelColorForResource(index) {
    const hue = (index * 137.508) % 360; // Use golden angle approximation for even distribution
    return `hsl(${hue}, 70%, 80%)`;
  }