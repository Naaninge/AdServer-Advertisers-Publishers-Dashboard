import Swal from 'sweetalert2';

interface adFormData {
    name: string;
    adSize: string;
    adArtwork: File;
    description: string;
    errors: string[];
}

export default async function addAdvertisement() {
    const result = await Swal.fire<adFormData>({
        // title: 'Add New RFQ',
        html:
            '<h2>Advertisement Details</h2>' +
            '<h3 class="swal2-input-label">Name</h3>' + '<input id="swal-input1" class="swal2-input" required>' +
            '<h3 class="swal2-input-label">Ad Size</h3>' + '<select id="swal-input2" class="swal2-input"><option value="512x512">512x512 (Square)</option><option value="long">Long</option><option value="video">Video</option></select>' +
            '<h3 class="swal2-input-label">Ad Artwork</h3>' + '<label for="file-upload" class="file-upload-label"><span class="file-upload-text">Choose File</span><input id="file-upload" type="file" name="filename" class="file-upload-input"></label>' +
            '<h3 class="swal2-input-label">Short Description</h3>' + '<textarea id="swal-input4" class="swal2-textarea"></textarea>',

        preConfirm: () => {
            const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
            const adSize = (document.getElementById('swal-input2') as HTMLInputElement).value;
            const adArtwork = (document.getElementById('file-upload') as HTMLInputElement).value;
            const description = (document.getElementById('swal-input4') as HTMLInputElement).value;
            const errors: string[] = [];

            if (!name) {
                errors.push('Ad Name is required');
            }
            if (!adSize) {
                errors.push('Ad Size is required');
            }
            if (!adArtwork) {
                errors.push('Ad Artwork is required');
            }
            if (!description) {
                errors.push('Short description is required');
            }

            if (errors.length) {
                Swal.showValidationMessage(errors.join('<br>'));
                return false;
            }

            return {
                name,
                adSize,
                adArtwork,
                description,
                errors,
            };
        },
        confirmButtonText: 'Post Advertisement',
        confirmButtonColor: '#111',
        customClass: 'swal-wide',
    });

    if (result.isConfirmed) {
        await Swal.fire({
            title: 'Submitted!',
            text: 'Your Ad has been successfully published.',
            icon: 'success',
            confirmButtonColor: '#000000',
        });
    }
}
