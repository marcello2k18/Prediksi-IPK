function addMataKuliah() {
    const tableBody = document.querySelector('#tableBody');
    const newRow = document.createElement('tr');
    const rowNumber = tableBody.rows.length + 1;

    newRow.className = 'even:bg-gray-50 hover:bg-gray-100 transition transform duration-300 opacity-0 scale-95';

    newRow.innerHTML = `
        <td class="p-3">${rowNumber}</td>
        <td class="p-3">
            <input type="text" name="mk[]" value="Mata Kuliah Baru" class="w-full px-3 py-2 border rounded-md">
        </td>
        <td class="p-3">
            <input type="text" name="sks[]" value="3" maxlength="2" required class="w-full px-3 py-2 border rounded-md">
        </td>
        <td class="p-3">
            <select name="nilai[]" class="w-full px-3 py-2 border rounded-md">
                <option value="">Belum Ada Nilai</option>
                <option value="4.00">A</option>
                <option value="3.70">A-</option>
                <option value="3.30">B+</option>
                <option value="3.00">B</option>
                <option value="2.70">B-</option>
                <option value="2.30">C+</option>
                <option value="2.00">C</option>
                <option value="1">D</option>
                <option value="0">E</option>
            </select>
        </td>
    `;

    tableBody.appendChild(newRow);

    requestAnimationFrame(() => {
        newRow.classList.remove('opacity-0', 'scale-95');
        newRow.classList.add('opacity-100', 'scale-100');
    });
}

function removeMataKuliah() {
    const tableBody = document.querySelector('#tableBody');
    const rows = tableBody.querySelectorAll('tr');
    const lastRow = rows[rows.length - 1];

    if (rows.length > 1) {
        // Tambahkan class untuk transisi
        lastRow.style.transition = 'all 300ms ease';
        lastRow.style.transformOrigin = 'center';
        lastRow.style.opacity = '1';
        lastRow.style.transform = 'scale(1)';

        // Trigger animasi secara bertahap agar browser sempat render
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                lastRow.style.opacity = '0';
                lastRow.style.transform = 'scale(0.95)';

                // Hapus row setelah transisi selesai
                setTimeout(() => {
                    lastRow.remove();
                }, 300);
            });
        });
    }
}



// Fungsi untuk menghitung nilai akhir
function calculateFinalGrade() {
    var table = document.querySelector('table');
    var totalSks = 0;
    var totalSksGrade = 0;

    for (var i = 1; i < table.rows.length; i++) {
        var sksInput = table.rows[i].cells[2].querySelector('input');
        var nilaiSelect = table.rows[i].cells[3].querySelector('select');

        var sks = parseFloat(sksInput.value);
        var nilaiStr = nilaiSelect.value;

        if (nilaiStr === "") continue;

        var nilai = parseFloat(nilaiStr);
        totalSks += sks;
        totalSksGrade += sks * nilai;
    }

    var resultElement = document.getElementById('hasilPerhitungan');

    if (totalSks > 0) {
        var finalGrade = totalSksGrade / totalSks;
        resultElement.textContent = 'Nilai Akhir: ' + finalGrade.toFixed(2);
    } else {
        resultElement.textContent = 'Nilai Akhir: - (Belum ada nilai yang bisa dihitung)';
    }
}
