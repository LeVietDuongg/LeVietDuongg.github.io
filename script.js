document.addEventListener('DOMContentLoaded', () => {
    const documents = [
        { id: 1, title: "Document 1", image: "https://via.placeholder.com/150", description: "Description of Document 1" },
        { id: 2, title: "Document 2", image: "https://via.placeholder.com/150", description: "Description of Document 2" },
        { id: 3, title: "Document 3", image: "https://via.placeholder.com/150", description: "Description of Document 3" }
    ];

    const featuredContainer = document.getElementById('featured-documents');
    
    if (featuredContainer) {
        documents.forEach(document => {
            const documentDiv = document.createElement('div');
            documentDiv.className = 'document';
            documentDiv.innerHTML = `
                <img src="${document.image}" alt="${document.title}">
                <h3>${document.title}</h3>
                <p>${document.description}</p>
                <a href="document-detail.html?id=${document.id}" class="view-detail">View Details</a>
            `;
            featuredContainer.appendChild(documentDiv);
        });
    }
});