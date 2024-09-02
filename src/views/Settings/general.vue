<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <div class="dashboard">
          <v-row align="center">
            <v-col cols="8">
              <div class="header">
                <h3>General</h3>
              </div>
            </v-col>
            <v-col cols="4" class="d-flex justify-end">
              <v-btn color="primary" @click="goBack">Back</v-btn>
            </v-col>
          </v-row>
          <v-row class="bg-white pa-4">
            <v-row>
              <v-col>
                <div class="input-section">
                  <label for="Site_url" class="input-label">Site url</label>
                  <v-text-field
                    type="url"
                    id="siteUrl"
                    v-model="siteUrl"
                    label="Site URL"
                    class="input-field"
                    full-width
                  ></v-text-field>
                </div>
                <div class="input-section">
                  <label for="Site_name" class="input-label">Site name</label>
                  <v-text-field
                    id="siteName"
                    v-model="siteName"
                    label="Site Name"
                    class="input-field"
                    full-width
                  ></v-text-field>
                </div>
                <div class="input-section">
                  <label for="force-https" class="input-label">Force HTTPS</label>
                  <div class="d-flex align-center">
                    <v-switch
                      v-model="forceHttps"
                      inset
                      color="grey"
                    ></v-switch>
                    <p class="ma-2">
                      {{ forceHttps ? 'The site will be forced to load with https' : 'The site will load from any available protocol' }}
                    </p>
                  </div>
                  <p>
                    Force the loading of the site using HTTPS, to improve the security and SEO positioning of the site.
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-row>
          <v-row class="pt-6">
            <v-col class="d-flex justify-end">
              <v-btn color="grey" @click="cancel">Cancel</v-btn>
              <v-btn color="success" class="ml-4" @click="saveSettings">Save settings</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { db } from '../../firebase'; 
import { collection, doc, setDoc } from 'firebase/firestore';

const siteUrl = ref("https://getlaradesk.com");
const siteName = ref("");
const forceHttps = ref(true);

const router = useRouter();
const toast = useToast();

const goBack = () => {
  toast.success("Returning to settings!");
  router.push('/dashboard/admin/settings');
};

const cancel = () => {
  // Clear form fields
  siteUrl.value = "";
  siteName.value = "";
  forceHttps.value = false;

  // Show cancel notification
  toast.success("Settings reset!");
};

const saveSettings = async () => {
  try {
    const docRef = doc(db, "settings", "general");
    await setDoc(docRef, {
      siteUrl: siteUrl.value,
      siteName: siteName.value,
      forceHttps: forceHttps.value
    });

    toast.success("Settings saved successfully!");

  } catch (error) {
    toast.error("Failed to save settings. Please try again.");
    console.error("Error saving settings:", error);
  }
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
.dashboard {
  margin: 30px;
  padding: 20px;
  background-color: #f5f7fb;
  border-radius: 10px;
}
.input-section {
  margin-bottom: 16px;
}
</style>
