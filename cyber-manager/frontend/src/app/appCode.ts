
import { Vue } from "vue-property-decorator";

export default class AppCode extends Vue {
    created() {
        this.init();
    }

    init() {
        console.log(this.$store.getters.userLogged)
        if (!this.$store.getters.userLogged) {
            this.$router.push("/");
        }
    }

    pageRouter(route: string) {
        this.$router.push(route);
    }
}
