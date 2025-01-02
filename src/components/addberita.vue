<template>
    <div>
        <!-- NAV BAR -->
        <nav class="navbar navbar-expand-lg" style="background: #ECEBE6;">
            <div class="container-fluid">
                <img src="../images/logo-NewCity.png" alt="logo-NewCity" style="width: 10%;" class="my-3 ms-3" />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>
                    <form class="d-flex">
                        <a href="#" class="container-fluid mx-auto border border-success"
                            style="border-radius: 50%; padding: 0;">
                            <img class="rounded-circle img-fluid" src="../images/img-profile.png"
                                style="height: 50px;" />
                        </a>
                    </form>
                </div>
            </div>
        </nav>
        <!-- NAV BAR -->

        <!-- SIDE BAR -->
        <div class="row">
            <div class="min-vh-100 d-flex align-items-center flex-column sidebar"
                style="background: #ECEBE6; width: 5%;">
                <div class="mt-4"></div>
                <a href="Login.html">
                    <div class="flex-column d-flex align-items-center flex-column icon-berita">
                        <img src="../images/logo-berita.png" alt="icon-berita" style="width: 50%;" />
                        <p class="" style="font-size: 13px; color: #3A5A40; font-weight: 600;">Berita</p>
                    </div>
                </a>
                <a href="Login.html">
                    <div class="flex-column d-flex align-items-center flex-column icon-berita">
                        <img src="../images/logo-laporan.png" alt="icon-laporan" style="width: 50%;" />
                        <p class="" style="font-size: 13px; font-weight: 600; color: #3A5A40;">Laporan</p>
                    </div>
                </a>
                <a href="Login.html">
                    <div class="flex-column d-flex align-items-center flex-column icon-berita">
                        <img src="../images/logo-pemerintah.png" alt="icon-laporan" style="width: 50%;" />
                        <p class="" style="font-size: 13px; font-weight: 600; color: #3A5A40;">Pemerintah</p>
                    </div>
                </a>
            </div>

            <!-- MAIN CONTENT -->
            <div class="col-md-10 d-flex p-4 editor-container">
                <!-- Text Editor Section -->
                <div class="editor-content">
                    <div class="toolbar d-flex align-items-center mb-3">
                        <div class="toolbar-buttons">
                            <button class="btn btn-secondary btn-editor" @click.prevent="formatText('bold')">B</button>
                            <button class="btn btn-secondary btn-editor"
                                @click.prevent="formatText('italic')">I</button>
                            <button class="btn btn-secondary btn-editor"
                                @click.prevent="formatText('underline')">U</button>
                            <button class="btn btn-secondary" @click.prevent="addLink">🔗</button>
                        </div>
                        <button class="btn btn-success ms-auto publish-button" @click="publish">Terbitkan</button>
                    </div>
                    <div class="text-area border p-3 mb-3" contenteditable="true" ref="editor"
                        @input="updateDetailsTitle" @focus="handleFocus" @blur="handleBlur">
                        <h2>{{ placeholders.title }}</h2>
                        <p>{{ placeholders.content }}</p>
                    </div>
                </div>

                <!-- Details Section -->
                <div class="details">
                    <div class="details-item">
                        <h5>Judul</h5>
                        <p>{{ detailsTitle }}</p>
                    </div>
                    <div class="details-item">
                        <h5>Editor</h5>
                        <p class="detail-description editor">admin</p>
                    </div>
                    <div class="details-item">
                        <h5>Terakhir Dimodifikasi</h5>
                        <p class="detail-description modified-date">{{ modifiedDate }}</p>
                    </div>
                    <div class="details-item">
                        <h5>Status</h5>
                        <p class="detail-description status">{{ status }}</p>
                    </div>
                    <h5>Kategori</h5>
                    <div> <input type="checkbox" id="bencanaAlam"> <label for="bencanaAlam">Bencana Alam</label><br>
                        <input type="checkbox" id="transportasi"> <label for="transportasi">Transportasi</label><br>
                        <input type="checkbox" id="saranaPrasarana"> <label for="saranaPrasarana">Sarana &
                            Prasarana</label><br> <input type="checkbox" id="olahRaga"> <label for="bencanaAlam">Olah
                            Raga</label><br> <input type="checkbox" id="kesehatan"> <label
                            for="bencanaAlam">Kesehatan</label><br> <input type="checkbox" id="keamanan"> <label
                            for="bencanaAlam">Keamanan</label><br> <input type="checkbox" id="tes"> <label
                            for="bencanaAlam">[Tes Kategori]</label><br> <input type="checkbox" id="tes1"> <label
                            for="bencanaAlam">[Tes Kategori 1]</label><br> <a href="#">Tambah Kategori...</a> </div>
                    <div>
                        <h5>Tag</h5>
                        <div id="tag-container"> <span class="badge bg-secondary tag-item" id="sampah">Sampah</span>
                            <span class="badge bg-secondary tag-item" id="airMeluap">Air Meluap</span> <span
                                class="badge bg-secondary tag-item" id="sungai">Sungai</span> <span
                                class="badge bg-secondary tag-item" id="hujan">Hujan</span> <span
                                class="badge bg-secondary tag-item" id="transport">Transportasi</span> <span
                                class="badge bg-secondary tag-item" id="kecelakaan">Kecelakaan</span> <span
                                class="badge bg-secondary tag-item" id="kebakaran">Kebakaran</span> <span
                                class="badge bg-secondary tag-item" id="samarkanDerasnya">Samarkan Derasnya</span> <span
                                class="badge bg-secondary tag-item" id="kesehatan">Kesehatan</span> <span
                                class="badge bg-secondary tag-item" id="mental">Mental Disorder</span> <span
                                class="badge bg-secondary tag-item" id="tes">[Tes Tag]</span> <span
                                class="badge bg-secondary tag-item" id="tes1">[Tes Tag 1]</span> </div>
                    </div>
                </div>
            </div>
            <!-- MAIN CONTENT -->
        </div>
        <!-- SIDE BAR -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            placeholders: {
                title: "Tambah Judul",
                content: "Mulai tulis isi berita di sini...",
            },
            detailsTitle: "",
            modifiedDate: "",
            status: "Draft",
        };
    },
    methods: {
        formatText(command) {
            document.execCommand(command, false, null);
        },
        addLink() {
            const url = prompt("Enter the URL");
            if (url) {
                document.execCommand("createLink", false, url);
            }
        },
        updateDetailsTitle() {
            const editor = this.$refs.editor;
            const title = editor.querySelector("h2").innerText.trim();
            this.detailsTitle = title || this.placeholders.title;
        },
        handleFocus(event) {
            const target = event.target;
            if (
                target.innerText.trim() === this.placeholders.title ||
                target.innerText.trim() === this.placeholders.content
            ) {
                target.innerText = "";
            }
        },
        handleBlur(event) {
            const target = event.target;
            if (!target.innerText.trim()) {
                target.innerText = target.tagName === "H2" ? this.placeholders.title : this.placeholders.content;
            }
        },
        publish() {
            this.updateDetailsTitle();
            this.modifiedDate = new Date().toLocaleString();
            alert("Published!");
        },
    },
};
</script>

<style scoped>
body {
    font-family: 'Poppins', sans-serif;
    background-color: #f8f9fa;
    margin: 0;
    padding: 0;
    overflow-x: hidden;

    overflow-y: hidden;
    height: 100%;
}

.sidebar {
    background-color: #ECEBE6;
}

.icon-berita img {
    width: 50%;
}

.col-md-10 {
    height: 100%;
    margin-right: 0%;
    background-color: #DEE5DC;
    border-left: 1px solid #ececec;
}

.editor-container {
    flex: 1;
    display: flex;
    padding: 20px;
    max-height: 0%;
    max-width: 95%;
    justify-content: space-between;
    overflow-y: auto;
    margin-left: auto;
    margin-right: 10px;
    border-radius: 8px;
    background-color: #DEE5DC;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.editor-content {
    flex: 1;
    margin-right: 20px;
    max-width: 70%;
}

.toolbar {
    margin-bottom: 10px;

}

.text-area {
    background-color: #ffffff;
    border: 1px solid #ced4da;
    padding: 10px;
    height: 500px;
    height: calc(100vh - 300px);
    overflow-y: auto;
}

.details {
    margin-top: 60px;
    flex: 0 0 30%;
    background-color: #DEE5DC;
    border-radius: 8px;
    padding: 15px;
    height: calc(100vh - 100px);
    overflow-y: hidden;
}

.details-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.publish-button {
    top: 20px;
    right: 20px;
}

.btn-secondary {
    background-color: #ffffff;
    color: #495057;
}

.btn-secondary.active {
    background-color: #495057;
    color: #fff;
}
</style>