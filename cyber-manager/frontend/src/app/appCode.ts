
import { Vue } from "vue-property-decorator";

export default class AppCode extends Vue {
    init() {
        if (!this.$store.getters.userLogged) {
            this.$store.commit('page', 'Home');
            this.$router.push("/");
        }
    }

    pageRouter(route: string) {
        this.$router.push(route);
    }
}
