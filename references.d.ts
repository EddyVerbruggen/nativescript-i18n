declare var global: NodeJS.Global;

// Augment the NodeJS global type with L function
declare namespace NodeJS {
    interface Global {
        L: any;
    }
}

declare var L: any;
