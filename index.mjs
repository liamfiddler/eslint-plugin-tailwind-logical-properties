// An ESLint plugin to enforce logical properties using TailwindCSS

const logicalPropertiesPlugin = {
    rules: {
        'no-physical-properties': {
            meta: {
                type: 'suggestion',
                docs: {
                    description: 'enforce logical properties',
                },
                fixable: "code",
                messages: {
                    useLogical:
                        'Use logical property {{logical}} instead of physical property {{physical}}.',
                },
            },
            create(context) {
                const physicalToLogical = {
                    mt: 'mbs',
                    mb: 'mbe',
                    ml: 'ms',
                    mr: 'me',
                    pt: 'pbs',
                    pb: 'pbe',
                    pl: 'ps',
                    pr: 'pe',
                    'rounded-t': 'rounded-bs',
                    'rounded-b': 'rounded-be',
                    'rounded-l': 'rounded-s',
                    'rounded-r': 'rounded-e',
                    'rounded-tl': 'rounded-ss',
                    'rounded-tr': 'rounded-se',
                    'rounded-bl': 'rounded-es',
                    'rounded-br': 'rounded-ee',
                    'border-t': 'border-bs',
                    'border-b': 'border-be',
                    'border-l': 'border-s',
                    'border-r': 'border-e',
                };

                const physicalPropertiesRegex = new RegExp(
                    `^(?:.*:)?(${Object.keys(physicalToLogical).join('|')})-`
                );

                function checkClasses(node, classString) {
                    if (typeof classString !== 'string') return;

                    const classes = classString.split(/\s+/);

                    classes.forEach((cls) => {
                        const match = cls.match(physicalPropertiesRegex);

                        if (match) {
                            const physical = match[1];
                            const logical = physicalToLogical[physical];

                            context.report({
                                node,
                                messageId: 'useLogical',
                                data: {
                                    physical,
                                    logical,
                                },
                                fix(fixer) {
                                    const sourceCode = context.getSourceCode();
                                    const text = sourceCode.getText(node);

                                    // Create a replacement pattern that matches the exact class in the text
                                    // and replaces only the physical part with the logical part.
                                    // This regex looks for the physical part following a colon or start of string,
                                    // followed by a hyphen.
                                    const replacement = text.replace(
                                        new RegExp(`((?:^|["'\`|\\s]|:))${physical}-`, 'g'),
                                        `$1${logical}-`
                                    );

                                    if (replacement === text) return null;
                                    return fixer.replaceText(node, replacement);
                                },
                            });
                        }
                    });
                }

                return {
                    JSXAttribute(node) {
                        if (node.name.name === 'className' && node.value) {
                            if (node.value.type === 'Literal') {
                                checkClasses(node, node.value.value);
                            } else if (
                                node.value.type === 'JSXExpressionContainer' &&
                                node.value.expression.type === 'TemplateLiteral'
                            ) {
                                node.value.expression.quasis.forEach((quasi) => {
                                    checkClasses(node, quasi.value.raw);
                                });
                            }
                        }
                    },
                    CallExpression(node) {
                        if (['cn', 'clsx', 'cva'].includes(node.callee.name)) {
                            node.arguments.forEach((arg) => {
                                if (arg.type === 'Literal') {
                                    checkClasses(arg, arg.value);
                                } else if (arg.type === 'TemplateLiteral') {
                                    arg.quasis.forEach((quasi) => {
                                        checkClasses(arg, quasi.value.raw);
                                    });
                                } else if (arg.type === 'ObjectExpression') {
                                    arg.properties.forEach((prop) => {
                                        if (prop.key.type === 'Literal') {
                                            checkClasses(prop.key, prop.key.value);
                                        } else if (
                                            prop.key.type === 'Identifier' &&
                                            !prop.computed
                                        ) {
                                            checkClasses(prop.key, prop.key.name);
                                        }
                                    });
                                }
                            });
                        }
                    },
                };
            },
        },
    },
};

export default logicalPropertiesPlugin;
