document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                id: document.getElementById('id').value,
                name: document.getElementById('name').value,
                role: document.getElementById('role').value,
                review: document.getElementById('review').value
            };

            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/testimonial', {
                 method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Testimonial Added Successfully!');
                    form.reset(); 
                } else {
                    const errorText = await response.text();
                    alert('Error: ' + errorText);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});