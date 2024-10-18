// function convertToDate(dateString: string): string {
//   const date = new Date(dateString);
//   const year = date.getUTCFullYear();
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const day = String(date.getUTCDate()).padStart(2, '0');

//   return `${year}-${month}-${day}`;
// }

// October 18, 2024, 02:28 PM

function convertToDate(dateString: string): string {
  const date = new Date(dateString);

  // Array of month names for formatting
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle 12 AM / PM edge case

  // Construct the final formatted string
  return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
}

export default convertToDate;
