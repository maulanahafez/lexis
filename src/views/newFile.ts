import AppTabs from "@/components/AppTabs.vue";
import { useUserStore } from "@/store/useUserStore";
import { IonButton, IonContent, IonPage } from "@ionic/vue";

export default (() => {
  const __VLS_setup = async () => {
    const store = useUserStore();
    const __VLS_publicComponent = (await import("vue")).defineComponent({
      setup() {
        return {};
      },
    });

    const __VLS_componentsOption = {};

    let __VLS_name!: "HomePage";
    function __VLS_template() {
      let __VLS_ctx!: InstanceType<import("./__VLS_types.js").PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<import("./__VLS_types.js").PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
      /* Components */
      let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
      let __VLS_otherComponents!: typeof __VLS_localComponents & import("./__VLS_types.js").GlobalComponents;
      let __VLS_own!: import("./__VLS_types.js").SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots })>;
      let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
      /* Style Scoped */
      type __VLS_StyleScopedClasses = {};
      let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
      /* CSS variable injection */
      /* CSS variable injection end */
      let __VLS_templateComponents!: {} & import("./__VLS_types.js").WithComponent<"IonPage", typeof __VLS_components, "IonPage"> &
        import("./__VLS_types.js").WithComponent<"IonHeader", typeof __VLS_components, "IonHeader"> &
        import("./__VLS_types.js").WithComponent<"IonToolbar", typeof __VLS_components, "IonToolbar"> &
        import("./__VLS_types.js").WithComponent<"IonToolbar", typeof __VLS_components, "IonToolbar", "ionToolbar", "ion-toolbar"> &
        import("./__VLS_types.js").WithComponent<"IonButtons", typeof __VLS_components, "IonButtons", "ionButtons", "ion-buttons"> &
        import("./__VLS_types.js").WithComponent<"IonButton", typeof __VLS_components, "IonButton", "ionButton", "ion-button"> &
        import("./__VLS_types.js").WithComponent<"IonIcon", typeof __VLS_components, "IonIcon", "ionIcon", "ion-icon"> &
        import("./__VLS_types.js").WithComponent<"IonLabel", typeof __VLS_components, "IonLabel", "ionLabel", "ion-label"> &
        import("./__VLS_types.js").WithComponent<"IonContent", typeof __VLS_components, "IonContent"> &
        import("./__VLS_types.js").WithComponent<"AppTabs", typeof __VLS_components, "AppTabs">;
      __VLS_components.IonPage;
      __VLS_components.IonPage;
      __VLS_components.IonPage;
      __VLS_components.IonPage;
      // @ts-ignore
      [IonPage, IonPage, IonPage, IonPage];
      __VLS_components.IonHeader;
      __VLS_components.IonHeader;
      // @ts-ignore
      [IonHeader, IonHeader];
      __VLS_components.IonToolbar;
      __VLS_components.IonToolbar;
      // @ts-ignore
      [IonToolbar, IonToolbar];
      __VLS_components.IonToolbar;
      __VLS_components.IonToolbar;
      __VLS_components.ionToolbar;
      __VLS_components.ionToolbar;
      __VLS_components["ion-toolbar"];
      __VLS_components["ion-toolbar"];
      // @ts-ignore
      [IonToolbar, IonToolbar];
      __VLS_components.IonButtons;
      __VLS_components.IonButtons;
      __VLS_components.IonButtons;
      __VLS_components.IonButtons;
      __VLS_components.ionButtons;
      __VLS_components.ionButtons;
      __VLS_components.ionButtons;
      __VLS_components.ionButtons;
      __VLS_components["ion-buttons"];
      __VLS_components["ion-buttons"];
      __VLS_components["ion-buttons"];
      __VLS_components["ion-buttons"];
      // @ts-ignore
      [IonButtons, IonButtons, IonButtons, IonButtons];
      __VLS_components.IonButton;
      __VLS_components.IonButton;
      __VLS_components.IonButton;
      __VLS_components.IonButton;
      __VLS_components.ionButton;
      __VLS_components.ionButton;
      __VLS_components.ionButton;
      __VLS_components.ionButton;
      __VLS_components["ion-button"];
      __VLS_components["ion-button"];
      __VLS_components["ion-button"];
      __VLS_components["ion-button"];
      // @ts-ignore
      [IonButton, IonButton, IonButton, IonButton];
      __VLS_components.IonIcon;
      __VLS_components.IonIcon;
      __VLS_components.IonIcon;
      __VLS_components.IonIcon;
      __VLS_components.ionIcon;
      __VLS_components.ionIcon;
      __VLS_components.ionIcon;
      __VLS_components.ionIcon;
      __VLS_components["ion-icon"];
      __VLS_components["ion-icon"];
      __VLS_components["ion-icon"];
      __VLS_components["ion-icon"];
      // @ts-ignore
      [IonIcon, IonIcon, IonIcon, IonIcon];
      __VLS_components.IonLabel;
      __VLS_components.IonLabel;
      __VLS_components.ionLabel;
      __VLS_components.ionLabel;
      __VLS_components["ion-label"];
      __VLS_components["ion-label"];
      // @ts-ignore
      [IonLabel, IonLabel];
      __VLS_components.IonContent;
      __VLS_components.IonContent;
      // @ts-ignore
      [IonContent, IonContent];
      __VLS_components.AppTabs;
      __VLS_components.AppTabs;
      // @ts-ignore
      [AppTabs, AppTabs];
      {
        __VLS_templateComponents.IonPage;
        (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonPage>) = {};
        {
          __VLS_templateComponents.IonHeader;
          (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonHeader>) = {};
          {
            __VLS_templateComponents.IonToolbar;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonToolbar>) = {};
          }
        }
      }
      {
        __VLS_templateComponents.IonToolbar;
        (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonToolbar>) = {};
        {
          __VLS_templateComponents.IonButtons;
          (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonButtons>) = { slot: "start" };
          {
            __VLS_templateComponents.IonButton;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonButton>) = {};
            const __VLS_0 = new __VLS_templateComponents.IonButton({});
            const __VLS_1 = __VLS_templateComponents.IonButton({});
            let __VLS_2!: import("./__VLS_types.js").PickNotAny<typeof __VLS_0, typeof __VLS_1>;
            type __VLS_3 = import("./__VLS_types.js").InstanceProps<typeof __VLS_2, typeof __VLS_templateComponents.IonButton>;
            const __VLS_4: import("./__VLS_types.js").EventObject<typeof __VLS_2, "click", typeof __VLS_templateComponents.IonButton, __VLS_3["onClick"]> = {
              click: __VLS_ctx.goHome,
            };
            // @ts-ignore
            [goHome];
            {
              __VLS_templateComponents.IonIcon;
              (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonIcon>) = { icon: __VLS_ctx.homeOutline };
              // @ts-ignore
              [homeOutline];
            }
            {
              __VLS_templateComponents.IonLabel;
              (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonLabel>) = {};
            }
          }
        }
        {
          __VLS_templateComponents.IonButtons;
          (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonButtons>) = { slot: "end" };
          {
            __VLS_templateComponents.IonButton;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonButton>) = {};
            const __VLS_5 = new __VLS_templateComponents.IonButton({});
            const __VLS_6 = __VLS_templateComponents.IonButton({});
            let __VLS_7!: import("./__VLS_types.js").PickNotAny<typeof __VLS_5, typeof __VLS_6>;
            type __VLS_8 = import("./__VLS_types.js").InstanceProps<typeof __VLS_7, typeof __VLS_templateComponents.IonButton>;
            const __VLS_9: import("./__VLS_types.js").EventObject<typeof __VLS_7, "click", typeof __VLS_templateComponents.IonButton, __VLS_8["onClick"]> = {
              click: __VLS_ctx.showNotification,
            };
            // @ts-ignore
            [showNotification];
            {
              __VLS_templateComponents.IonIcon;
              (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonIcon>) = { icon: __VLS_ctx.notificationsOutline };
              // @ts-ignore
              [notificationsOutline];
            }
          }
        }
      }
      {
        __VLS_templateComponents.IonPage;
        (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonPage>) = {};
        {
          __VLS_templateComponents.IonContent;
          (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.IonContent>) = {};
          {
            (({}) as JSX.IntrinsicElements).div;
            (({}) as JSX.IntrinsicElements).div;
            (__VLS_x as JSX.IntrinsicElements)["div"] = { class: "bar" };
          }
          {
            (({}) as JSX.IntrinsicElements).div;
            (({}) as JSX.IntrinsicElements).div;
            (__VLS_x as JSX.IntrinsicElements)["div"] = { class: "cursor-pointer" };
            type __VLS_10 = JSX.IntrinsicElements["div"];
            const __VLS_11: import("./__VLS_types.js").EventObject<typeof undefined, "click", {}, __VLS_10["onClick"]> = {
              click: ($event) => {
                __VLS_ctx.$router.push("/HomePage");
              },
            };
            // @ts-ignore
            [$router];
          }
          {
            __VLS_templateComponents.AppTabs;
            (__VLS_x as import("./__VLS_types.js").ComponentProps<typeof __VLS_templateComponents.AppTabs>) = {};
          }
        }
      }
      if (typeof __VLS_styleScopedClasses === "object" && !Array.isArray(__VLS_styleScopedClasses)) {
      }
      declare var __VLS_slots: {};
      return __VLS_slots;
    }
    const __VLS_internalComponent = (await import("vue")).defineComponent({
      setup() {
        return {
          AppTabs: AppTabs,
          IonButton: IonButton,
          IonContent: IonContent,
          IonPage: IonPage,
        };
      },
    });
    return {} as typeof __VLS_publicComponent;
  };
  return {} as typeof __VLS_setup extends () => Promise<infer T> ? T : never;
})({} as any);
