// Notes View JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const subjectFilter = document.getElementById('subjectFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const searchInput = document.getElementById('searchInput');
    const noteCards = document.querySelectorAll('.note-card');

    // Filter functionality
    function filterNotes() {
        const subjectValue = subjectFilter.value;
        const semesterValue = semesterFilter.value;
        const searchValue = searchInput.value.toLowerCase();

        noteCards.forEach(card => {
            const subject = card.dataset.subject;
            const semester = card.dataset.semester;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.note-content p').textContent.toLowerCase();

            const subjectMatch = !subjectValue || subject === subjectValue;
            const semesterMatch = !semesterValue || semester === semesterValue;
            const searchMatch = !searchValue || 
                title.includes(searchValue) || 
                description.includes(searchValue);

            if (subjectMatch && semesterMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners
    if (subjectFilter) subjectFilter.addEventListener('change', filterNotes);
    if (semesterFilter) semesterFilter.addEventListener('change', filterNotes);
    if (searchInput) searchInput.addEventListener('input', filterNotes);
});

// Share functionality
function shareNote(noteId) {
    const url = `${window.location.origin}/study/notes/${noteId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Check out this note',
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