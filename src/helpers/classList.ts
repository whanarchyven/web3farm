export const classList = (...args: (string | undefined)[]) => {
    return args.filter(Boolean).join(" ");
}