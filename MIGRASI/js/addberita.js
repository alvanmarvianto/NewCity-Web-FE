$(document).ready(function () {
    $('.detail-description.editor').text('');
    $('.detail-description.status').text('');

    function formatText(command, value = null) {
        document.execCommand(command, false, value);
    }


    // [] Input Field (Placeholder)
    const placeholderTitle = 'Tambah judul...';
    const placeholderContent = 'Mulai tulis isi berita di sini...';

    if ($('#editor h2').text().trim() === '') {
        $('#editor h2').text(placeholderTitle);
    }
    if ($('#editor p').text().trim() === '') {
        $('#editor p').text(placeholderContent);
    }

    $('#editor').on('focus', 'h2, p', function () {
        if ($(this).text() === placeholderTitle || $(this).text() === placeholderContent) {
            $(this).text('');
        }
    });

    $('#editor').on('blur', 'h2, p', function () {
        if (!$(this).text().trim().length) {
            $(this).text($(this).is('h2') ? placeholderTitle : placeholderContent);
        }
    });

    // [] Simpan Detail Berita
    const detailsTitle = $('#details-title');

    function updateDetailsTitle() {
        const editorTitle = $('#editor h2').text();
        detailsTitle.text(editorTitle || 'Tambah judul...');
    }

    $('#editor h2').on('input', updateDetailsTitle);

    $('.btn-editor').click(function () {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            applyStyle($(this));
        } else {
            removeStyle($(this));
        }
    });

    // [] Penanggalan Publikasi
    function updateModifiedDate() {
        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = currentDate.getFullYear();

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        $('.detail-description.modified-date').text(formattedDate);
    }

    // [] Kelola Tag Berita
    $('.tag-item').click(function () {
        $(this).toggleClass('bg-secondary bg-primary');
    });

    // [] Simpan Status Publikasi (Terbit/Draft)
    $('#saveStatus').click(function () {
        const selectedStatus = $('input[name="statusOption"]:checked').val();
        $('.detail-description.status').text(selectedStatus);
        $('#statusModal').modal('hide');

        const jsonData = collectData();
        console.log(JSON.stringify(jsonData, null, 2));
        saveJsonData(jsonData);
    });

    // [] Ambil Data Dari Editor Ke JSON
    function collectData() {
        const title = $('#editor h2').text();
        const content = $('#editor p').text();
        const author = 'admin';
        const modifiedDate = $('.detail-description.modified-date').text();
        const categories = [];
        $('input[type="checkbox"]:checked').each(function () {
            categories.push($(this).next('label').text());
        });

        const tags = [];
        $('.tag-item.bg-primary').each(function () {
            tags.push($(this).text());
        });

        const status = $('.detail-description.status').text();

        const existingId = window.currentId || undefined;

        return {
            id: existingId,
            judul: title,
            konten: content,
            editor: author,
            tanggal: modifiedDate,
            kategori: categories,
            tag: tags,
            status: status
        };
    }

    // [] Simpan Data Ke JSON
    function saveJsonData(jsonData) {
        console.log('Sending data:', jsonData);
        $.ajax({
            url: 'http://localhost:3000/saveJson',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(jsonData),
            success: function (response) {
                console.log('Data successfully updated:', response);
                if (!window.currentId) {
                    window.currentId = response.id;
                }
            },
            error: function (xhr, status, error) {
                console.error('Error saving data:', error);
            }
        });
    }

    // [] Tombol Terbitkan
    $('.publish-button').click(function () {
        updateDetailsTitle();
        updateModifiedDate();

        $('#statusModal').modal('show');
    });

    // [] Teks Editor
    function addLink() {
        const url = prompt("Enter the URL");
        formatText("createLink", url);
    }

    $('.toolbar .btn').eq(3).click(addLink);

    function applyStyle(button) {
        if (button.hasClass('bold-btn')) {
            document.execCommand('bold');
        }
        if (button.hasClass('italic-btn')) {
            document.execCommand('italic');
        }
    }

    function removeStyle(button) {
        if (button.hasClass('bold-btn')) {
        }
        if (button.hasClass('italic-btn')) {
            document.execCommand('italic');
        }
    }
});
