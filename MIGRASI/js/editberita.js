$(document).ready(function () {
    const queryParams = new URLSearchParams(window.location.search);
    const beritaId = queryParams.get('id');

    // Fetch the existing berita data
    $.ajax({
        url: `http://localhost:3000/getBerita?id=${beritaId}`,
        type: 'GET',
        success: function(response) {
            // Populate the form fields with the existing data
            $('#editor h2').text(response.judul);
            $('#editor p').text(response.konten);
            $('.detail-description.editor').text(response.editor);
            $('.detail-description.modified-date').text(response.tanggal);
            $('.detail-description.status').text(response.status);
            response.kategori.forEach(function (kategori) {
                $(`input[type="checkbox"][id='${kategori.replace(/\s+/g, '')}']`).prop('checked', true);
            });
            response.tag.forEach(function (tag) {
                $(`#tag-container .tag-item[id='${tag.replace(/\s+/g, '')}']`).addClass('bg-primary').removeClass('bg-secondary');
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });

    // Save the changes back to the JSON file
    $('#saveButton').click(function () {
        const updatedData = {
            id: beritaId,
            judul: $('#editor h2').text(),
            konten: $('#editor p').text(),
            editor: $('.detail-description.editor').text(),
            tanggal: $('.detail-description.modified-date').text(),
            kategori: [],
            tag: [],
            status: $('.detail-description.status').text()
        };

        $('input[type="checkbox"]:checked').each(function () {
            updatedData.kategori.push($(this).next('label').text());
        });

        $('#tag-container .tag-item.bg-primary').each(function () {
            updatedData.tag.push($(this).text());
        });

        $.ajax({
            url: 'http://localhost:3000/updateBerita',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: function(response) {
                console.log('Data successfully updated:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error saving data:', error);
            }
        });
    });
});
