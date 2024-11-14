import type { RouteLocationNormalizedLoadedGeneric, Router } from "vue-router";
import mitt, { type Emitter } from "mitt";
import { useTasksStore } from "@/stores/TasksStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { toast as sonner } from 'vue-sonner'

const { toast } = useToast();
const taskStore = useTasksStore();

type ReminderEvent = {
    id: bigint;
    name: string;
    router?: Router;
    route?: RouteLocationNormalizedLoadedGeneric;
}

let date = new Date().toLocaleString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});
date = date.charAt(0).toUpperCase() + date.slice(1);

const events = {
    insertTask: (payload: ReminderEvent) => {
        sonner(payload.name, {
            description: date,
            action: {
                label: "Visualizar",
                onClick: () => payload.router?.push(`/task/${payload.id}`)
            },
        })
    },
    removeTask: (payload: ReminderEvent) => {
        taskStore.removeTask(payload.id);
        toast({
            title: payload.name,
            description: date
        });
    },
    toggleCompletedTask: (payload: ReminderEvent) => {
        const reminder = taskStore.detailTask(payload.id);
        if (!reminder) {
            toast({
                title: "Erro inesperado no servidor, tente novamente depois.",
                description: date
            });
            return;
        }
        taskStore.toggleCompletedTask(payload.id);
        toast({
            title: payload.name,
            description: date
        });
    },
};

type EventSchema<T extends Record<string, (payload: ReminderEvent) => void>> = {
    [ K in keyof T ]: Parameters<T[ K ]>[ 0 ];
};
type MittSchema = EventSchema<
    typeof events & {
        all: (payload: ReminderEvent) => void;
    }
>;
export const bus: Emitter<MittSchema> = mitt<MittSchema>();

bus.on("*", (type: unknown, payload) => {
    events[ type as keyof typeof events ](payload);
});
