import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    Animated,
    Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

interface QuizScreenProps {
    navigation: any;
}

const quizQuestion = {
    id: '4',
    title: 'Functions & Loops',
    question: 'What is the output of the following code snippet?',
    code: 'def greet():\n    print("Hello World")\ngreet()',
    options: [
        { id: 'a', text: 'Hello World', isCorrect: true },
        { id: 'b', text: 'Error', isCorrect: false },
        { id: 'c', text: 'world', isCorrect: false },
        { id: 'd', text: 'None', isCorrect: false },
    ],
};

const fullHintText = "Remember to check the indentation inside the function!";

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState(false);

    // Bot Animation State
    const [hintText, setHintText] = useState("");
    const [isBotCollapsed, setIsBotCollapsed] = useState(false);
    const [isTyping, setIsTyping] = useState(true);

    // Animations
    const collapseAnim = useRef(new Animated.Value(1)).current; // 1 = expanded, 0 = collapsed
    const textOpacityAnim = useRef(new Animated.Value(1)).current;

    // Typing Effect
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullHintText.length) {
                setHintText(fullHintText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                // Auto-collapse after delay
                setTimeout(() => collapseBot(), 2000);
            }
        }, 30); // Speed of typing

        return () => clearInterval(typingInterval);
    }, []);

    const collapseBot = () => {
        setIsBotCollapsed(true);
        Animated.parallel([
            Animated.timing(collapseAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.ease,
            }),
            Animated.timing(textOpacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false, // Text opacity often needs non-native for layout shifts? No, but safer.
            })
        ]).start();
    };

    const expandBot = () => {
        if (isTyping) return; // Don't interrupt typing
        setIsBotCollapsed(false);
        Animated.parallel([
            Animated.timing(collapseAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.out(Easing.back(1.5)), // Bounce back
            }),
            Animated.timing(textOpacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            })
        ]).start();
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        setIsChecked(true);
    };

    const handleContinue = () => {
        navigation.goBack();
    };

    const currentOption = quizQuestion.options.find(o => o.id === selectedOption);
    const isCorrect = currentOption?.isCorrect;

    // Expand width interpolation
    const bubbleWidth = collapseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [60, width - 80] // Collapsed width vs almost full width
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Gradient Background: Matches Guide Layout (Solid Dark + No Orbs per user request) */}
            {/* Guide uses bg-background-light dark:bg-background-dark which is #191022 */}
            {/* If user wants NO gradient design like guide (meaning they hated my previous one),
                 I'll stick to a very subtle one or solid to be safe and clean. 
                 The guide had "bg-background-dark" and *some* blurs. 
                 I will use a subtle vertical gradient to look premium but clean. */}
            <LinearGradient
                colors={['#191022', '#1a1025']} // Very subtle shift
                style={StyleSheet.absoluteFill}
            />

            <View style={[styles.header, { paddingTop: insets.top + 12, paddingBottom: 12 }]}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="chevron-left" size={28} color={COLORS.white} />
                </TouchableOpacity>

                <View style={styles.headerBadge}>
                    <LinearGradient
                        colors={['rgba(127, 13, 242, 0.2)', 'rgba(127, 13, 242, 0.05)']}
                        style={styles.headerBadgeGradient}
                    >
                        <MaterialIcons name="psychology" size={16} color={COLORS.primaryLight} />
                        <Text style={styles.headerBadgeText}>{quizQuestion.title}</Text>
                    </LinearGradient>
                </View>

                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="close" size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Compact Progress Bar */}
            <View style={styles.statusBarContainer}>
                <View style={styles.statusRow}>
                    <Text style={styles.questionCounter}>
                        Question <Text style={styles.questionNumber}>04</Text> <Text style={{ color: 'rgba(255,255,255,0.3)', fontWeight: '400' }}>/ 10</Text>
                    </Text>
                    <View style={styles.timerBadge}>
                        <MaterialIcons name="timer" size={14} color={COLORS.primaryLight} />
                        <Text style={styles.timerText}>0:45</Text>
                    </View>
                </View>
                <View style={styles.progressBarBg}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.primaryLight]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressBarFill, { width: '40%' }]}
                    />
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: 100 } // Enough for bottom actions
                ]}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* Mascot / Hint Animation Section */}
                <View style={styles.mascotSection}>
                    {/* Bot Icon - Always Visible (Left aligned) */}
                    <TouchableOpacity activeOpacity={0.8} onPress={expandBot}>
                        <View style={styles.mascotContainer}>
                            <LinearGradient
                                colors={['#6366f1', COLORS.primary]}
                                style={styles.mascotBorder}
                            >
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe3yC1WHPkaN3JR1qiJnqhDiDGpkf7kWTChB2tfLEiwZNxJXaNczD1wmWNmb8uXbcv5BVrxieBntt462_IJyI56xD7sxkPX9YnAC-9G1b8kHT7G2DD6tViY5Pg8QwNeCDg1vNzmK5OUTlzZeopdMs77mW3uTw63MKEFP3nYyI5DrexJ5EygBSLRfoFbxRDyRg1DOK_oNPOS0waSKo0enRfihoIQQJ2AYje1PbTY6AugvrZC0pVEE9AExE_BSKY0ih0sGdz4nTNVQUo' }}
                                    style={styles.mascotImage}
                                />
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>

                    {/* Animated Bubble */}
                    <Animated.View style={[styles.hintBubbleWrapper, { width: bubbleWidth }]}>
                        <TouchableOpacity onPress={expandBot} activeOpacity={1} style={{ flex: 1 }}>
                            <LinearGradient
                                colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
                                style={styles.hintBubbleContent}
                            >
                                {isBotCollapsed ? (
                                    <View style={styles.collapsedBadge}>
                                        <Text style={styles.hintBadgeText}>HINT</Text>
                                    </View>
                                ) : (
                                    <Animated.View style={{ opacity: textOpacityAnim }}>
                                        <View style={styles.hintHeader}>
                                            <Text style={styles.botName}>CODINO BOT</Text>
                                            <View style={styles.hintBadge}>
                                                <Text style={styles.hintBadgeText}>PRO TIP</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.hintText}>
                                            {hintText}
                                            {isTyping && <Text style={styles.cursor}>|</Text>}
                                        </Text>
                                    </Animated.View>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/* Question Card - Compact Padding */}
                <View style={styles.questionCard}>
                    <LinearGradient
                        colors={['rgba(127, 13, 242, 0.05)', 'rgba(127, 13, 242, 0.01)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.questionLine} />
                    <Text style={styles.questionText}>{quizQuestion.question}</Text>

                    <View style={styles.codeBlock}>
                        <LinearGradient
                            colors={['#0f0f12', '#141418']}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.codeControls}>
                            <View style={[styles.controlDot, { backgroundColor: '#ff5f56' }]} />
                            <View style={[styles.controlDot, { backgroundColor: '#ffbd2e' }]} />
                            <View style={[styles.controlDot, { backgroundColor: '#27c93f' }]} />
                        </View>
                        <Text style={styles.codeText}>
                            <Text style={{ color: '#c678dd' }}>def</Text> <Text style={{ color: '#61afef' }}>greet</Text>():{'\n'}
                            {'    '}<Text style={{ color: '#61afef' }}>print</Text>(<Text style={{ color: '#98c379' }}>"Hello World"</Text>){'\n'}
                            <Text style={{ color: '#61afef' }}>greet</Text>()
                        </Text>
                    </View>
                </View>

                {/* Options - Compact Grid/Stack */}
                <View style={styles.optionsContainer}>
                    {quizQuestion.options.map((option) => {
                        const isSelected = selectedOption === option.id;
                        const showCorrectStyle = isChecked && option.isCorrect;
                        const showWrongStyle = isChecked && isSelected && !option.isCorrect;

                        let borderColor = 'rgba(255, 255, 255, 0.08)';
                        let bgColor = 'rgba(255, 255, 255, 0.05)';

                        if (showCorrectStyle) {
                            borderColor = COLORS.green500;
                            bgColor = 'rgba(34, 197, 94, 0.15)';
                        } else if (showWrongStyle) {
                            borderColor = COLORS.red400;
                            bgColor = 'rgba(248, 113, 113, 0.15)';
                        } else if (isSelected) {
                            borderColor = COLORS.primary;
                            bgColor = 'rgba(127, 13, 242, 0.15)';
                        }

                        return (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionPill,
                                    { borderColor, backgroundColor: bgColor },
                                    isSelected && styles.activePillShadow,
                                    showCorrectStyle && styles.successPillShadow,
                                    showWrongStyle && styles.errorPillShadow,
                                ]}
                                onPress={() => !isChecked && setSelectedOption(option.id)}
                                activeOpacity={isChecked ? 1 : 0.8}
                            >
                                <View style={styles.optionContent}>
                                    <LinearGradient
                                        colors={isSelected ? [COLORS.primary, COLORS.primaryLight] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                                        style={[
                                            styles.optionLetterCircle,
                                            showCorrectStyle && { backgroundColor: COLORS.green500 },
                                        ]}
                                    >
                                        {showCorrectStyle ? (
                                            <MaterialIcons name="check" size={16} color={COLORS.white} />
                                        ) : showWrongStyle ? (
                                            <MaterialIcons name="close" size={16} color={COLORS.white} />
                                        ) : (
                                            <Text style={[
                                                styles.optionLetterText,
                                                isSelected && { color: COLORS.white }
                                            ]}>
                                                {option.id.toUpperCase()}
                                            </Text>
                                        )}
                                    </LinearGradient>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[
                                            styles.optionText,
                                            isSelected && { color: COLORS.white, fontFamily: 'SpaceGrotesk_700Bold' }
                                        ]}>{option.text}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Feedback Box - Compact & Visible without Scroll */}
                {isChecked && isCorrect && (
                    <View style={styles.feedbackCard}>
                        <LinearGradient
                            colors={['rgba(34, 197, 94, 0.15)', 'rgba(34, 197, 94, 0.05)']}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.feedbackContent}>
                            <View style={styles.bulbIconContainer}>
                                <MaterialIcons name="lightbulb" size={20} color={COLORS.green400} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.feedbackTitle}>Correct Answer!</Text>
                                <Text style={styles.feedbackText}>
                                    The function <Text style={styles.codeSnippet}>greet()</Text> is defined to print "Hello World".
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

            </ScrollView>

            {/* Bottom Actions - FIXED & COMPACT */}
            <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                <LinearGradient
                    colors={['rgba(25, 16, 34, 0)', 'rgba(25, 16, 34, 0.95)', 'rgba(25, 16, 34, 1)']}
                    style={StyleSheet.absoluteFill}
                />

                {isChecked ? (
                    <View style={styles.navRow}>
                        <TouchableOpacity style={styles.navButtonSecondary}>
                            <MaterialIcons name="refresh" size={20} color={COLORS.white} />
                            <Text style={styles.navButtonTextSecondary}>Review</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 0.6 }} onPress={handleContinue}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                style={styles.navButtonPrimary}
                            >
                                <Text style={styles.navButtonTextPrimary}>Next Challenge</Text>
                                <MaterialIcons name="arrow-forward" size={20} color={COLORS.white} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.navRow}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            disabled={!selectedOption}
                            onPress={handleCheck}
                        >
                            <LinearGradient
                                colors={selectedOption ? [COLORS.primary, COLORS.primaryDark] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                                style={[styles.checkButtonFull, !selectedOption && { opacity: 0.5 }]}
                            >
                                <Text style={[styles.checkButtonText, !selectedOption && { color: 'rgba(255,255,255,0.3)' }]}>Validate Logic</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.backgroundDark,
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20, // Slightly reduced padding
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 12,
        zIndex: 50,
    },
    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.whiteAlpha5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
    },
    headerBadge: {
        borderRadius: 9999,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(127, 13, 242, 0.3)',
    },
    headerBadgeGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    headerBadgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    questionNumber: {
        color: COLORS.primaryLight,
        fontSize: 16,
    },
    statusBarContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12, // Compact
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    questionCounter: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    timerBadge: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        backgroundColor: COLORS.whiteAlpha5,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
    },
    timerText: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    progressBarBg: {
        height: 6,
        width: '100%',
        backgroundColor: COLORS.whiteAlpha10,
        borderRadius: 9999,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 9999,
    },
    mascotSection: {
        marginBottom: 16, // Compact
        flexDirection: 'row',
        alignItems: 'flex-start', // Top align for animation
        gap: 12,
        height: 80, // Fixed height to prevent layout jump? No, let it grow if needed
    },
    mascotContainer: {
        width: 44,
        height: 44,
    },
    mascotBorder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mascotImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#000',
    },
    hintBubbleWrapper: {
        backgroundColor: COLORS.cardDark,
        borderRadius: 16,
        borderTopLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        overflow: 'hidden',
    },
    hintBubbleContent: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
    },
    collapsedBadge: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryAlpha20,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'center',
    },
    hintHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    botName: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
    },
    hintBadge: {
        backgroundColor: COLORS.primaryAlpha20,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 4,
    },
    hintBadgeText: {
        color: COLORS.primary,
        fontSize: 9,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    hintText: {
        color: COLORS.white, // Ensure white
        fontSize: 13,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 18,
    },
    cursor: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    questionCard: {
        backgroundColor: COLORS.cardDark,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        borderRadius: 16,
        padding: 16, // Compact
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 8,
    },
    questionLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 4,
        backgroundColor: COLORS.primary,
    },
    questionText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 12,
        paddingLeft: 4, // Space from line
    },
    codeBlock: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
    },
    codeControls: {
        flexDirection: 'row',
        gap: 5,
        position: 'absolute',
        top: 8,
        right: 8,
    },
    controlDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    codeText: {
        fontFamily: 'monospace',
        fontSize: 13,
        color: COLORS.gray300,
        lineHeight: 20,
    },
    optionsContainer: {
        gap: 10, // Compact gap
        marginTop: 12,
    },
    optionPill: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12, // Compact
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activePillShadow: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    successPillShadow: {
        shadowColor: COLORS.green500,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    errorPillShadow: {
        shadowColor: COLORS.red400,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingLeft: 4,
    },
    optionLetterCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    optionLetterText: {
        color: COLORS.gray400,
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    optionText: {
        color: COLORS.white,
        fontSize: 15,
        fontFamily: 'NotoSans_400Regular',
    },
    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 16,
        // Gradient fade for bottom action container
        backgroundColor: 'rgba(25, 16, 34, 0.98)',
        borderTopWidth: 1,
        borderTopColor: COLORS.whiteAlpha5,
        zIndex: 40,
    },
    navRow: {
        flexDirection: 'row',
        gap: 12,
    },
    navButtonSecondary: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: COLORS.whiteAlpha5,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        paddingVertical: 14,
        borderRadius: 14,
    },
    navButtonTextSecondary: {
        color: COLORS.white,
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: 14,
    },
    navButtonPrimary: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: COLORS.white,
        paddingVertical: 14,
        borderRadius: 14,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    navButtonTextPrimary: {
        color: COLORS.white,
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: 14,
    },
    checkButtonFull: {
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
    },
    checkButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    feedbackCard: {
        marginTop: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(34, 197, 94, 0.3)',
        overflow: 'hidden',
        position: 'relative',
    },
    feedbackContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        padding: 16,
    },
    bulbIconContainer: {
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        padding: 6,
        borderRadius: 16,
    },
    feedbackTitle: {
        color: COLORS.green500,
        fontSize: 15,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 4,
    },
    feedbackText: {
        color: COLORS.gray300,
        fontSize: 13,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 18,
    },
    codeSnippet: {
        fontFamily: 'monospace',
        color: COLORS.primaryLight,
        fontWeight: 'bold',
    },
});

export default QuizScreen;
