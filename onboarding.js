document.getElementById('indicator1').addEventListener('click', function() {
    navigateToPage(1);
});

document.getElementById('indicator2').addEventListener('click', function() {
    navigateToPage(2);
});

document.getElementById('indicator3').addEventListener('click', function() {
    navigateToPage(3);
});

function navigateToPage(pageNumber) {
    // Implement the logic to navigate to the corresponding page
    console.log('Navigating to page', pageNumber);
    // Example: window.location.href = `page${pageNumber}.html`;
}
