// PYQ View JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const subjectFilter = document.getElementById('subjectFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const yearFilter = document.getElementById('yearFilter');
    const searchInput = document.getElementById('searchInput');
    const pyqCards = document.querySelectorAll('.note-card');

    // Filter functionality
    function filterPYQs() {
        const subjectValue = subjectFilter.value;
        const semesterValue = semesterFilter.value;
        const yearValue = yearFilter.value;
        const searchValue = searchInput.value.toLowerCase();

        pyqCards.forEach(card => {
            const subject = card.dataset.subject;
            const semester = card.dataset.semester;
            const year = card.dataset.year;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.note-content p').textContent.toLowerCase();

            const subjectMatch = !subjectValue || subject === subjectValue;
            const semesterMatch = !semesterValue || semester === semesterValue;
            const yearMatch = !yearValue || year === yearValue;
            const searchMatch = !searchValue || 
                title.includes(searchValue) || 
                description.includes(searchValue);

            if (subjectMatch && semesterMatch && yearMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners
    if (subjectFilter) subjectFilter.addEventListener('change', filterPYQs);
    if (semesterFilter) semesterFilter.addEventListener('change', filterPYQs);
    if (yearFilter) yearFilter.addEventListener('change', filterPYQs);
    if (searchInput) searchInput.addEventListener('input', filterPYQs);
});

// Share functionality
function sharePyq(pyqId) {
    const url = `${window.location.origin}/study/pyqs/${pyqId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Check out this PYQ',
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        });
    }
} 